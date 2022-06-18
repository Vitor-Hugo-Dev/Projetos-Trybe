const routes = require('express').Router();
const validateJWT = require('../middlewares/validateJWT');
const {
  createSalesController,
  getSaleByIdController,
  getSalesByUserIdController,
  getSalesBySellerIdController,
  updateSaleStatusController,
} = require('../controllers/saleController');

routes.post('/', validateJWT, createSalesController);
routes.get('/user', validateJWT, getSalesByUserIdController);
routes.get('/seller', validateJWT, getSalesBySellerIdController);

routes.get('/:id', validateJWT, getSaleByIdController);
routes.put('/:id', validateJWT, updateSaleStatusController);
module.exports = routes;
