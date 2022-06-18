const {
  createSales,
  findSales,
  findSalesById,
  updateSales,
  deleteSales,
} = require('../services/salesServices');
const { success } = require('../utils/dictionary/statusCode');

const createSalesMd = async (req, res, next) => {
  const sales = req.body;
  try {
    const salesId = await createSales(sales);

    return res.status(success).json({ _id: salesId, itensSold: sales });
  } catch (error) {
    return next(error);
  }
};

const findSalesMd = async (req, res, next) => {
  try {
    const vendas = await findSales();

    return res.status(success).json({ sales: vendas });
  } catch (error) {
    return next(error);
  }
};

const findSalesByIdMd = async (req, res, next) => {
  try {
    const { id } = req.params;
    const vendas = await findSalesById(id);

    return res.status(success).json({ sales: vendas });
  } catch (error) {
    return next(error);
  }
};

const updateSalesMd = async (req, res, next) => {
  const { id } = req.params;
  const sales = req.body;
  try {
    const updatedId = await updateSales(id, sales);

    return res.status(success).json({ _id: updatedId, itensSold: sales });
  } catch (error) {
    return next(error);
  }
};

const deleteSalesMd = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sales = await deleteSales(id);

    return res.status(success).json({ _id: id, itensSold: sales });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createSalesMd,
  findSalesMd,
  findSalesByIdMd,
  updateSalesMd,
  deleteSalesMd,
};
