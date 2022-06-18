const Sequelize = require('sequelize');
const { Sale, SaleProduct, Product, User } = require('../database/models');
const config = require('../database/config/config');
const {
  createSalesValidation,
  userExistsValidation,
  // updateSaleStatusValidation,
} = require('./validations/saleValidations');
const errorHandler = require('../utils/errorHandler');
const { badRequest } = require('../utils/statusCode');

const sequelize = new Sequelize(config.development);

// função para retornar os produtos com seus respectivos ids, e com as quantidades.
const findProductIds = async (products, saleId) => {
  const productList = await Product.findAll();
  const newProductList = [];
  for (let i = 0; i < products.length; i += 1) {
    const currentProduct = productList.find(
      (product) => product.name === products[i].name,
    );
    if (!currentProduct) {
      throw errorHandler(badRequest, 'Não existem produtos cadastrados');
    }
    newProductList.push({
      productId: currentProduct.dataValues.id,
      quantity: products[i].quantity,
      saleId,
    });
  }
  return newProductList;
};

module.exports = {
  createSalesService: async (saleInfo, products) => {
    const transaction = await sequelize.transaction();
    try {
      const validate = await createSalesValidation({ ...saleInfo, status: 'Pendente' });
      if (validate !== true) throw validate;
      const { id } = await Sale.create(
        { ...saleInfo, status: 'Pendente' },
        { transaction },
      );
      const productIds = await findProductIds(products, id);
      await SaleProduct.bulkCreate(productIds, { transaction });
      await transaction.commit();
      return { id };
    } catch (error) {
      await transaction.rollback();
      throw errorHandler(badRequest, error.message);
    }
  },
  getSaleByIdServices: async (id) => {
    const sale = await Sale.findOne({
      where: { id },
      include: [
        {
          model: SaleProduct,
          include: Product,
          as: 'products',
        },
        {
          model: User,
          as: 'seller',
        },
      ],
    });

    if (!sale) throw errorHandler(badRequest, 'Esta venda não existe');

    // Referência de como lidar com o include em uma table one-to-many:
    // https://sequelize.org/v7/manual/advanced-many-to-many.html#through-tables-versus-normal-tables-and-the--quot-super-many-to-many-association-quot-
    return sale;
  },
  getSalesByUserIdServices: async (id) => {
    const currentUser = await User.findByPk(id);

    userExistsValidation(currentUser);

    const sale = await Sale.findAll({
      where: { userId: id },
    });

    return sale;
  },
  getSalesBySellerIdServices: async (id) => {
    const currentUser = await User.findByPk(id);

    userExistsValidation(currentUser);

    const sale = await Sale.findAll({
      where: { sellerId: id },
    });

    return sale;
  },
  updateSaleStatusServices: async (saleId, status) => {
    const { dataValues } = await Sale.findByPk(saleId);

    // updateSaleStatusValidation(dataValues, userId);

    await Sale.update(
      { ...dataValues, status },
      { where: { id: saleId } },
    );

    const updatedSale = await Sale.findOne({
      where: { id: saleId },
      include: [
        {
          model: SaleProduct,
          include: Product,
          as: 'products',
        },
        { model: User, as: 'seller' },
      ],
    });

    return updatedSale;
  },
};
