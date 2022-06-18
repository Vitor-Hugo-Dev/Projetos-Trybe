const {
  registerRecipes,
  listRecipes,
  listRecipeById,
  updateRecipes,
  deleteRecipes,
} = require('../models/recipesModel');
const {
  registerRecipesValidations,
  listRecipesByIdValidations,
} = require('../utils/functions/validates');

const registerRecipesService = async (recipes) => {
  const { name, ingredients, preparation } = recipes;

  const recipesValidation = await registerRecipesValidations({
    name,
    ingredients,
    preparation,
  });
  if (recipesValidation) {
    return recipesValidation;
  }
  await registerRecipes(recipes);
  return recipes;
};

const listRecipesService = async () => {
  const recipes = await listRecipes();

  return recipes;
};

const listRecipeByIdService = async (id) => {
  const recipe = await listRecipeById(id);
  if (!recipe) {
    return listRecipesByIdValidations();
  }
  return recipe;
};

const updateRecipesService = async (id, recipe, _id, role) => {
  const { name, ingredients, preparation } = recipe;
  const recipesValidation = await registerRecipesValidations({
    name,
    ingredients,
    preparation,
  });

  if (recipesValidation) {
    return listRecipesByIdValidations();
  }
  await updateRecipes(id, recipe);

  if (role === 'admin') {
    return { userId: _id, ...recipe, _id: id };
  }

  return { userId: _id, ...recipe, _id: id };
};

const deleteRecipesService = async (id, role) => {
  const deleted = await deleteRecipes(id);

  if (role === 'admin') {
    return deleted;
  }
  return deleted;
};

module.exports = {
  registerRecipesService,
  listRecipesService,
  listRecipeByIdService,
  updateRecipesService,
  deleteRecipesService,
};
