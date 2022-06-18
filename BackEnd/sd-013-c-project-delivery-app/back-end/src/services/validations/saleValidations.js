const Joi = require('joi');
const { badRequest } = require('../../utils/statusCode');
const errorHandler = require('../../utils/errorHandler');

const saleSchema = Joi.object({
  userId: Joi.number().required(),
  sellerId: Joi.number().required(),
  totalPrice: Joi.number().required(),
  deliveryAddress: Joi.string().required(),
  deliveryNumber: Joi.string().required(),
  status: Joi.string().required(),
});

module.exports = {
  createSalesValidation: async (currentSale) => {
    const { error } = saleSchema.validate(currentSale);
    if (error) throw errorHandler(badRequest, error.message);

    return true;
  },
  userExistsValidation: (user) => {
    if (!user) throw errorHandler(badRequest, 'Usuário não encontrado');

    return true;
  },
  updateSaleStatusValidation: (sale, userId) => {
    if (!sale) throw errorHandler(badRequest, 'Esta venda não existe');
    
    if (sale.userId === userId || sale.sellerId === userId) {
      return true;
    }
    throw errorHandler(
      badRequest,
      'Você não tem permissão para alterar esta venda',
    );
  },
};
