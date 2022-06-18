const { 
  criateCategoriesService,
  getCategoriesServices,
 } = require('../services/categoriesServices');
const { created, success } = require('../utils/statusCode');

module.exports = {
  createCategoriesController: async (req, res, next) => {
    const { name } = req.body;
    try {
      const category = await criateCategoriesService({ name });
      return res.status(created).json(category);
    } catch (error) {
      return next(error);
    }
  },
  getCategoriesController: async (req, res, next) => {
    try {
      const categories = await getCategoriesServices();

      return res.status(success).json(categories);
    } catch (error) {
      return next(error);
    }
  },
};