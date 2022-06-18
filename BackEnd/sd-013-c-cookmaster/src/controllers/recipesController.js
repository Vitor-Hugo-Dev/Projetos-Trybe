const {
  registerRecipesService,
  listRecipesService,
  listRecipeByIdService,
  updateRecipesService,
  deleteRecipesService,
} = require('../services/recipesServices');
const { created, success, noContent } = require('../utils/dictionary/statusCode');

const registerRecipesController = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const recipes = req.body;

    const recipe = await registerRecipesService({ userId: _id, ...recipes });

    return res.status(created).json({ recipe: { userId: _id, ...recipe } });
  } catch (error) {
    return next(error);
  }
};

const listRecipesController = async (req, res, next) => {
  try {
    const recipes = await listRecipesService();

    return res.status(success).json(recipes);
  } catch (error) {
    return next(error);
  }
};

const listRecipeByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const recipe = await listRecipeByIdService(id);

    return res.status(success).json(recipe);
  } catch (error) {
    return next(error);
  }
};

const updateRecipesController = async (req, res, next) => {
  try {
    const { _id, role } = req.user;

    const { id } = req.params;
    const recipe = req.body;
    
    const makedRecipe = await updateRecipesService(id, recipe, _id, role);

    return res.status(success).json(makedRecipe);
  } catch (error) {
    return next(error);
  }
};

const deleteRecipesController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.user;
    
    return res.status(noContent).json(await deleteRecipesService(id, role));
  } catch (error) {
    return next(error);
  }
};

const uploadImageController = async (req, res, next) => {
  try {
    const { id } = req.params;
    // const { file } = req;
    const { _id, role } = req.user;
    const image = `localhost:3000/src/uploads/${id}.jpeg`;
    const recipe = await listRecipeByIdService(id);
    const makedRecipe = await updateRecipesService(id, { image, ...recipe }, _id, role);

    return res.status(success).json(makedRecipe);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  registerRecipesController,
  listRecipesController,
  listRecipeByIdController,
  updateRecipesController,
  deleteRecipesController,
  uploadImageController,
};
