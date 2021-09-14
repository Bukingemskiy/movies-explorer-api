/* eslint-disable comma-dangle */
/* eslint-disable no-console */
/* eslint-disable quotes */

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { errors, celebrate, Joi } = require("celebrate");
const { createUser, login } = require("./controllers/users");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const auth = require("./middlewares/auth");
const errorsHandler = require("./middlewares/errorsHandler");
const usersRoute = require("./routes/users");
const moviesRoute = require("./routes/movies");
const NOT_FOUND = require("./errors/NOT_FOUND");

const { PORT = 3000 } = process.env;
mongoose.connect("mongodb://localhost:27017/bitfilmsdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  createUser
);
app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login
);
app.use(auth);
app.use("/users", usersRoute);
app.use("/movies", moviesRoute);
app.use((req, res, next) => next(new NOT_FOUND("Ресурс не найден")));
app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
