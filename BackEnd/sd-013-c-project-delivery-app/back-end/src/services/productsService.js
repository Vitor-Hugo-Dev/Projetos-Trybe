const { Product } = require('../database/models');

const getProductsService = async () => {
  const products = await Product.findAll();

  return products;
};

const getProductByIdService = async (id) => {
  const product = await Product.findOne({
    where: { id },
  });

  return product;
};

module.exports = {
  getProductsService,
  getProductByIdService,
};