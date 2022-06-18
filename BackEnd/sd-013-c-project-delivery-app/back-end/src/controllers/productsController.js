const { getProductsService, getProductByIdService } = require('../services/productsService');
const { success } = require('../utils/statusCode');

const getProductsController = async (_req, res, next) => {
  try {
    const products = await getProductsService();

    return res.status(success).json(products);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getProductsByIdController = async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await getProductByIdService(id);  

    return res.status(success).json(product);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  getProductsController,
  getProductsByIdController,
};