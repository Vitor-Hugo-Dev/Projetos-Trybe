const jwt = require('jsonwebtoken');

const errorHandler = require('../utils/errorHandler');
const { badRequest, notFound } = require('../utils/statusCode');
const { loginValidations } = require('./validations/loginValidations');
const { User } = require('../database/models');
const cryptoPassword = require('../utils/cryptoFunction');
const { unauthorizedMessage } = require('../utils/errorMessages');
// const { notFoundMessage } = require('../utils/errorMessages');

const secret = process.env.SECRET || 'secret_key';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const loginService = async ({ email, password }) => {
  const { error } = loginValidations.validate({ email, password });

  if (error) return errorHandler(badRequest, error.message);

  const emailSearch = await User.findOne({
    where: { email },
  });

  const funcCrypto = cryptoPassword(password);
  if (!emailSearch || emailSearch.password !== funcCrypto) {
    console.log(emailSearch);
    return errorHandler(notFound, unauthorizedMessage('password'));
  }

  const token = jwt.sign({ email, password }, secret, jwtConfig);
    const { name, role } = emailSearch;
    return { token, email, name, role };
};

module.exports = {
  loginService,
};