/* eslint-disable comma-dangle */
/* eslint-disable quotes */

const jwt = require("jsonwebtoken");
const UNAUTHORIZED = require("../errors/UNAUTHORIZED");

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  if (!req.cookies.jwt) {
    next(new UNAUTHORIZED("Необходима авторизация"));
  }
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production"
        ? JWT_SECRET
        : "eb28135ebcfc17578f96d4d65b6c7871f2c803be4180c165061d5c2db621c51b"
    );
  } catch (err) {
    next(new UNAUTHORIZED("Необходима авторизация"));
    next(err);
  }
  req.user = payload;
  next();
};

module.exports = auth;
