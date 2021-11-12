/* eslint-disable quotes */

const rateLimiter = require("express-rate-limit");

const limiter = rateLimiter({
  windowMs: 10 * 60 * 1000,
  max: 10000,
});

module.exports = limiter;
