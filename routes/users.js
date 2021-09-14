/* eslint-disable comma-dangle */
/* eslint-disable quotes */

const { celebrate, Joi } = require("celebrate");
const router = require("express").Router();
const { getOwnerUser, updateProfileUser } = require("../controllers/users");

router.get("/me", getOwnerUser);
router.patch(
  "/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email(),
    }),
  }),
  updateProfileUser
);

module.exports = router;
