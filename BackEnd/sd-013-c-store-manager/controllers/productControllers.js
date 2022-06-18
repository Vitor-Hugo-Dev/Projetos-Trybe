const { 
  productCreate,
  findProducts,
  findProductsById,
  updateProduct,
  deleteProduct } = require('../services/productServices');
const { created, success } = require('../utils/dictionary/statusCode');

const createProduct = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;

    const product = await productCreate(name, quantity);

    return res.status(created).json(product);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return next(error);
  }
};

const findProductsMd = async (req, res, next) => {
  try {
    const product = await findProducts();
    // console.log(products);
    return res.status(success).json({ products: product });
  } catch (error) {
    return next(error);
  }
};

const findProductsByIdMd = async (req, res, next) => {
  try {
    const { id } = req.params;
    return res.status(success).json(await findProductsById(id));
  } catch (error) {
    return next(error);
  }
};

const updateProductMd = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;

    return res.status(success).json(await updateProduct(id, name, quantity));  
  } catch (error) {
    return next(error);
  }
};

const deleteProductMd = async (req, res, next) => {
  try {
    const { id } = req.params;
    return res.status(success).json(await deleteProduct(id));
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createProduct,
  findProductsByIdMd,
  findProductsMd,
  updateProductMd,
  deleteProductMd,
};
