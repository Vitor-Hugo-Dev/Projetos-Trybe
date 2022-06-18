const Joi = require('joi');
const { User } = require('../../database/models');
const { badRequest, conflict, notFound } = require('../../utils/statusCode');
const errorHandler = require('../../utils/errorHandler');
const { conflictMessage, notFoundMessage } = require('../../utils/errorMessages');

const schemaUser = Joi.object({
  name: Joi.string().min(12).required(),
  email: Joi.string().email().required(), 
  password: Joi.string().min(6).required(),
});

module.exports = {
  createUserValidations: async (user) => {
    const { error } = schemaUser.validate(user);
    if (error) throw errorHandler(badRequest, error.message);

    const userConflict = await User.findOne({ where: { email: user.email } });
    if (userConflict) throw errorHandler(conflict, conflictMessage('user'));

    return true;
  },
  getUserValidations: (user) => {
    if (!user) throw errorHandler(notFound, notFoundMessage('user'));

    return true;
  },
  updateUserValidations: (user) => {
    const { error } = schemaUser.validate(user);
    if (error) throw errorHandler(badRequest, error.message);

    return true;
  },
};