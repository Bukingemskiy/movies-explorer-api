/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const BAD_REQUEST = require("../errors/BAD_REQUEST");
const UNAUTHORIZED = require("../errors/UNAUTHORIZED");
const NOT_FOUND = require("../errors/NOT_FOUND");
const CONFLICT = require("../errors/CONFLICT");

const OK = 200;
const CREATED = 201;
const { NODE_ENV, JWT_SECRET } = process.env;

const getOwnerUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new Error("NotFound"))
    .then((user) => res.status(OK).send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BAD_REQUEST(`Переданы некорректные данные: ${err}`));
      } else if (err.message === "NotFound") {
        next(new NOT_FOUND(`Пользователь по данному id не найден: ${err}`));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.create({ name, email, password: hash })
      .then(() =>
        res.status(CREATED).send({
          data: { name, email },
        })
      )
      .catch((err) => {
        if (err.name === "MongoError" && err.code === 11000) {
          next(new CONFLICT("Пользователь с таким email уже существует"));
        } else if (err.name === "ValidationError") {
          next(new BAD_REQUEST(`Переданы некорректные данные: ${err}`));
        } else {
          next(err);
        }
      });
  });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        next(new UNAUTHORIZED("Такого пользователя не существует"));
        return;
      }
      bcrypt.compare(password, user.password, (error, isValid) => {
        if (!isValid) {
          next(new UNAUTHORIZED("Неверный email или пароль"));
          return;
        }
        if (error) {
          next(new BAD_REQUEST(error));
          return;
        }
        if (isValid) {
          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === "production"
              ? JWT_SECRET
              : "eb28135ebcfc17578f96d4d65b6c7871f2c803be4180c165061d5c2db621c51b",
            {
              expiresIn: "7d",
            }
          );
          res
            .cookie("jwt", token, {
              maxAge: 3600000 * 24 * 90,
              httpOnly: true,
              sameSite: true,
              secure: true,
            })
            .status(OK)
            .send({ token });
        }
      });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BAD_REQUEST(`Переданы некорректные данные: ${err}`));
      } else {
        next(err);
      }
    });
};

const updateProfileUser = (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(
    userId,
    { name, email },
    {
      new: true,
      runValidators: true,
    }
  )
    .orFail(new Error("NotFound"))
    .then((user) => res.status(OK).send({ data: user }))
    .catch((err) => {
      if (err.name === "MongoError" && err.code === 11000) {
        next(new CONFLICT("Пользователь с таким email уже существует"));
      } else if (err.name === "ValidationError") {
        next(new BAD_REQUEST(`Переданы некорректные данные: ${err}`));
      } else if (err.message === "NotFound") {
        next(new NOT_FOUND(`Пользователь по данному id не найден: ${err}`));
      } else {
        next(err);
      }
    });
};

const signOut = (req, res) =>
  res.clearCookie("jwt").send({ message: "Cookies удалены" });

module.exports = {
  getOwnerUser,
  createUser,
  login,
  updateProfileUser,
  signOut,
};
