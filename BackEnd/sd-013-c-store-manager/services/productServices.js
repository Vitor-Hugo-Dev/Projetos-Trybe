const Joi = require('@hapi/joi');
const {
  createProduct,
  findByname,
  productsFind,
  productsFindById,
  updateProductById,
  deleteProductById } = require('../models/productsModels');
const { unprocessable } = require('../utils/dictionary/statusCode');
const errorHandler = require('../utils/functions/errorHandler');

const productSchema = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().min(1).required(),
});

const productCreate = async (name, quantity) => {
  const { error } = productSchema.validate({ name, quantity });
  
  if (error) {
    throw errorHandler(unprocessable, error.message, 'invalid_data');
  }

  if (await findByname(name)) {
    throw errorHandler(unprocessable, 'Product already exists', 'invalid_data');
  }

  const id = await createProduct(name, quantity);

  return { _id: id, name, quantity };
};

const findProducts = async () => {
  const products = await productsFind();

  return products;
};

const findProductsById = async (id) => {
  const product = await productsFindById(id);

  if (!product) {
    throw errorHandler(unprocessable, 'Wrong id format', 'invalid_data');
  }
  return product;
};

const updateProduct = async (id, name, quantity) => {
  const { error } = productSchema.validate({ name, quantity });

  if (error) {
    throw errorHandler(unprocessable, error.message, 'invalid_data');
  }

  const product = await updateProductById(id, name, quantity);

  return product;
};

const deleteProduct = async (id) => {
  const product = await deleteProductById(id);
  if (!product) {
    throw errorHandler(unprocessable, 'Wrong id format', 'invalid_data');
  }
  return product;
};

module.exports = {
  productCreate,
  findProducts,
  findProductsById,
  updateProduct,
  deleteProduct,
};