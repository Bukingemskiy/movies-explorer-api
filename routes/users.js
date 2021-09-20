const router = require('express').Router();
const { validateUpdateProfileUser } = require('../middlewares/validations');
const { getOwnerUser, signOut, updateProfileUser } = require('../controllers/users');

router.get('/me', getOwnerUser);
router.get('/signout', signOut);
router.patch(
  '/me',
  validateUpdateProfileUser,
  updateProfileUser,
);

module.exports = router;
