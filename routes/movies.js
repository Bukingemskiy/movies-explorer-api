const router = require('express').Router();
const { validateDeleteMovie, validateCreateMovie } = require('../middlewares/validations');
const {
  getMovies,
  deleteMovie,
  createMovie,
} = require('../controllers/movies');

router.get('/', getMovies);
router.delete(
  '/:movieId',
  validateDeleteMovie,
  deleteMovie,
);
router.post(
  '/',
  validateCreateMovie,
  createMovie,
);

module.exports = router;
