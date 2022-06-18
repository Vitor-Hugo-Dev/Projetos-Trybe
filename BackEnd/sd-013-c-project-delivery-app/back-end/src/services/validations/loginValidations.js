const Joi = require('joi');

module.exports = {
  loginValidations: Joi.object({
    email: Joi
    .string()
    .email()
    .required(),
    password: Joi.string().min(6).required(),
  }),
};