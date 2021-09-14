/* eslint-disable comma-dangle */
/* eslint-disable quotes */

const { celebrate, Joi } = require("celebrate");
const router = require("express").Router();
const {
  getMovies,
  deleteMovie,
  createMovie,
} = require("../controllers/movies");

router.get("/", getMovies);
router.delete(
  "/:movieId",
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().required().length(24).hex(),
    }),
  }),
  deleteMovie
);
router.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string()
        .required()
        .pattern(
          /^(https?:\/\/)(www\.)?([\w\W]{1,})(\.)([\w\W]{1,})([\w\W]{1,})#?$/
        ),
      trailer: Joi.string()
        .required()
        .pattern(
          /^(https?:\/\/)(www\.)?([\w\W]{1,})(\.)([\w\W]{1,})([\w\W]{1,})#?$/
        ),
      thumbnail: Joi.string()
        .required()
        .pattern(
          /^(https?:\/\/)(www\.)?([\w\W]{1,})(\.)([\w\W]{1,})([\w\W]{1,})#?$/
        ),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  createMovie
);

module.exports = router;
