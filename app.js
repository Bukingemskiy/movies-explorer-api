/* eslint-disable comma-dangle */
/* eslint-disable quotes */

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const { errors } = require("celebrate");
const cors = require("cors");
const router = require("./routes/index");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const errorsHandler = require("./middlewares/errorsHandler");
const limiter = require("./middlewares/rateLimiter");

const { PORT = 3000, NODE_ENV, MONGO_URL } = process.env;
mongoose.connect(
  NODE_ENV === "production" ? MONGO_URL : "mongodb://localhost:27017/moviesdb",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

const app = express();
app.use(requestLogger);
app.use(limiter);
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);
app.listen(PORT);
