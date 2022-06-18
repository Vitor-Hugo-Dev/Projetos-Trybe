const {
  createSalesService,
  getSaleByIdServices,
  getSalesByUserIdServices,
  getSalesBySellerIdServices,
  updateSaleStatusServices,
} = require('../services/saleServices');
const { created, success } = require('../utils/statusCode');

module.exports = {
  createSalesController: async (req, res, next) => {
    try {
      const { saleInfo, products } = req.body;
      const { id } = req.user;
      const createdSale = await createSalesService(
        { ...saleInfo, userId: id },
        products,
      );

      return res.status(created).json(createdSale);
    } catch (error) {
      return next(error);
    }
  },
  getSaleByIdController: async (req, res, next) => {
    try {
      const { id } = req.params;
      const sale = await getSaleByIdServices(id);

      return res.status(200).json(sale);
    } catch (error) {
      return next(error);
    }
  },
  getSalesByUserIdController: async (req, res, next) => {
    try {
      const { id } = req.user;
      const sales = await getSalesByUserIdServices(id);

      return res.status(success).json(sales);
    } catch (error) {
      return next(error);
    }
  },
  getSalesBySellerIdController: async (req, res, next) => {
    try {
      const { id } = req.user;
      const sales = await getSalesBySellerIdServices(id);

      return res.status(success).json(sales);
    } catch (error) {
      return next(error);
    }
  },
  updateSaleStatusController: async (req, res, next) => {
    try {
      const { id } = req.user;
      const { status } = req.body;
      const saleId = req.params.id;
      const updatedSale = await updateSaleStatusServices(saleId, { status, userId: id });

      return res.status(success).json(updatedSale);
    } catch (error) {
      return next(error);
    }
  },
};
