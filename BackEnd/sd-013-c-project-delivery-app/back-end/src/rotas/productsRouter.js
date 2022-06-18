const routes = require('express').Router();
const { 
  getProductsController, 
  getProductsByIdController, 
} = require('../controllers/productsController');

routes.get(
  '/',
  getProductsController,
); 

routes.get(
  '/:id',
  getProductsByIdController,
); 

module.exports = routes;