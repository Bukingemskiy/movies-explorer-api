const router = require('express').Router();
const usersRoute = require('./users');
const moviesRoute = require('./movies');
const auth = require('../middlewares/auth');
const NOT_FOUND = require('../errors/NOT_FOUND');
const { createUser, login } = require('../controllers/users');
const { validateCreateUser, validateLogin } = require('../middlewares/validations');

router.post(
  '/signup',
  validateCreateUser,
  createUser,
);
router.post(
  '/signin',
  validateLogin,
  login,
);
router.use(auth);
router.use('/users', usersRoute);
router.use('/movies', moviesRoute);
router.use((req, res, next) => next(new NOT_FOUND('Ресурс не найден')));

module.exports = router;
