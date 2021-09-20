const Movie = require('../models/movie');
const BAD_REQUEST = require('../errors/BAD_REQUEST');
const FORBIDDEN = require('../errors/FORBIDDEN');
const NOT_FOUND = require('../errors/NOT_FOUND');

const OK = 200;
const CREATED = 201;

const getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => {
      res.send({ data: movies });
    })
    .catch((err) => {
      next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .orFail(() => {
      throw new NOT_FOUND('Фильм с указанным id не найден');
    })
    .then((movie) => {
      if (req.user._id !== movie.owner.toString()) {
        next(new FORBIDDEN('Чужие фильмы удалять нельзя'));
      } else {
        movie
          .remove()
          .then(() => res.status(OK).send({
            message: 'Фильм успешно удалён',
          }))
          .catch(next);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BAD_REQUEST(`Переданы некорректные данные: ${err}`));
      } else {
        next(err);
      }
    });
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.status(CREATED).send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BAD_REQUEST(
            `Переданы некорректные данные при создании фильма: ${err}`,
          ),
        );
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  deleteMovie,
  createMovie,
};
