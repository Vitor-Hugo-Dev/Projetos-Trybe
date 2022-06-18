const Joi = require('@hapi/joi');
const { badRequest, conflict, unauthorized, notFound } = require('../dictionary/statusCode');
const errorHandler = require('./errorHandler');
const { getUser } = require('../../models/usersModels');

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const registerUserValidations = async (user) => {
  const { error } = userSchema.validate({ ...user });
  if (error) {
    throw errorHandler(badRequest, error.message, 'Invalid entries. Try again.');
  }
  if (await getUser(user.email)) {
    throw errorHandler(conflict, 'Email already registered', 'Email already registered');
  }
  return false;
};

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const loginUserValidations = async (email, password, user) => {
  const { error } = loginSchema.validate({ email, password });
  if (error) {
    throw errorHandler(unauthorized, 'All fields must be filled', 'All fields must be filled');
  }
  if (!user || user.password !== password) {
    throw errorHandler(unauthorized,
    'Incorrect username or password',
    'Incorrect username or password');
  }
  return true;
};

const recipeSchema = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
});

const registerRecipesValidations = async (recipes) => {
  const { error } = recipeSchema.validate(recipes);
  if (error) {
    throw errorHandler(badRequest, 'Invalid entries. Try again.', 'Invalid entries. Try again.');
  }
  return false;
};

const listRecipesByIdValidations = async () => {
  throw errorHandler(notFound, 'recipe not found', 'recipe not found');
};

module.exports = {
  registerUserValidations,
  loginUserValidations,
  registerRecipesValidations,
  listRecipesByIdValidations,
};