/* eslint-disable comma-dangle */
/* eslint-disable quotes */

const { celebrate, Joi } = require("celebrate");

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(2)
      .max(30)
      .message("Имя должно содержать от 2 до 30 символов")
      .messages({
        "any.required": 'Поле "name" должно быть заполнено',
      }),
    email: Joi.string()
      .required()
      .email()
      .message('Поле "email" должно быть валидным email-адресом')
      .messages({
        "any.required": 'Поле "email" должно быть заполнено',
      }),
    password: Joi.string()
      .required()
      .min(8)
      .message("Пароль должнен содержать не менее 8 символов")
      .messages({
        "any.required": 'Поле "password" должно быть заполнено',
      }),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .message('Поле "email" должно быть валидным email-адресом')
      .messages({
        "any.required": 'Поле "email" должно быть заполнено',
      }),
    password: Joi.string()
      .required()
      .min(8)
      .message("Пароль должнен содержать не менее 8 символов")
      .messages({
        "any.required": 'Поле "password" должно быть заполнено',
      }),
  }),
});

const validateUpdateProfileUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(2)
      .max(30)
      .message("Имя должно содержать от 2 до 30 символов")
      .messages({
        "any.required": 'Поле "name" должно быть заполнено',
      }),
    email: Joi.string()
      .required()
      .email()
      .message('Поле "email" должно быть валидным email-адресом')
      .messages({
        "any.required": 'Поле "email" должно быть заполнено',
      }),
  }),
});

const validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string()
      .required()
      .hex()
      .message("id фильма должнен содержать 24 символа")
      .messages({
        "any.required": 'Поле "movieId" должно быть заполнено',
      }),
  }),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().messages({
      "any.required": 'Поле "country" должно быть заполнено',
    }),
    director: Joi.string().required().messages({
      "any.required": 'Поле "director" должно быть заполнено',
    }),
    duration: Joi.number().required().messages({
      "any.required": 'Поле "duration" должно быть заполнено',
    }),
    year: Joi.string().required().messages({
      "any.required": 'Поле "year" должно быть заполнено',
    }),
    description: Joi.string().required().messages({
      "any.required": 'Поле "description" должно быть заполнено',
    }),
    image: Joi.string()
      .required()
      .pattern(
        /^(https?:\/\/)(www\.)?([\w\W]{1,})(\.)([\w\W]{1,})([\w\W]{1,})#?$/
      )
      .message('Поле "image" должно быть валидной ссылкой')
      .messages({
        "any.required": 'Поле "image" должно быть заполнено',
      }),
    trailer: Joi.string()
      .required()
      .pattern(
        /^(https?:\/\/)(www\.)?([\w\W]{1,})(\.)([\w\W]{1,})([\w\W]{1,})#?$/
      )
      .message('Поле "trailer" должно быть валидной ссылкой')
      .messages({
        "any.required": 'Поле "trailer" должно быть заполнено',
      }),
    thumbnail: Joi.string()
      .required()
      .pattern(
        /^(https?:\/\/)(www\.)?([\w\W]{1,})(\.)([\w\W]{1,})([\w\W]{1,})#?$/
      )
      .message('Поле "thumbnail" должно быть валидной ссылкой')
      .messages({
        "any.required": 'Поле "thumbnail" должно быть заполнено',
      }),
    movieId: Joi.number().required().messages({
      "any.required": 'Поле "movieId" должно быть заполнено',
    }),
    nameRU: Joi.string().required().messages({
      "any.required": 'Поле "nameRU" должно быть заполнено',
    }),
    nameEN: Joi.string().required().messages({
      "any.required": 'Поле "nameEN" должно быть заполнено',
    }),
  }),
});

module.exports = {
  validateCreateUser,
  validateLogin,
  validateUpdateProfileUser,
  validateDeleteMovie,
  validateCreateMovie,
};
