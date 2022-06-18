const Joi = require('@hapi/joi');
const {
  salesCreate,
  salesFind,
  salesFindById,
  updateSalesById,
  deleteSalesById } = require('../models/salesModels');
const { unprocessable, notFound } = require('../utils/dictionary/statusCode');
// const { findProductsById } = require('../models/productsModels');
const errorHandler = require('../utils/functions/errorHandler');

// validação feita com base no exemplo do link: https://stackoverflow.com/questions/37744483/how-to-validate-array-of-objects-using-joi
const salesObjectSchema = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required(),
});
const salesSchema = Joi.array().items(salesObjectSchema);

const createSales = async (sales) => {
  const { error } = salesSchema.validate(sales);
  if (error) {
    throw errorHandler(unprocessable, 'Wrong product ID or invalid quantity', 'invalid_data');
  }
  const id = await salesCreate(sales);

  return id;
};

const findSales = async () => {
  const sales = await salesFind();
  return sales;
};

const findSalesById = async (id) => {
  const sales = await salesFindById(id);

  if (!sales) {
    throw errorHandler(notFound, 'Sale not found', 'not_found');
  }
  return sales;
};

const updateSales = async (id, sales) => {
  const { error } = salesSchema.validate(sales);
  if (error) {
    throw errorHandler(unprocessable, 'Wrong product ID or invalid quantity', 'invalid_data');
  }
  const updatedId = await updateSalesById(id, sales);

  return updatedId;
};

const deleteSales = async (id) => {
  const sales = await deleteSalesById(id);

  if (!sales) {
    throw errorHandler(unprocessable, 'Wrong sale ID format', 'invalid_data');
  }

  return sales;
};

module.exports = {
  createSales,
  findSales,
  findSalesById,
  updateSales,
  deleteSales,
};
