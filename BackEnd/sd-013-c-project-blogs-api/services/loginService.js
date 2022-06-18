const jwt = require('jsonwebtoken');
const { validateLogin } = require('../utils/validates');
require('dotenv').config();

const secret = process.env.SECRET || 'secret';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

module.exports = {
  loginService: async (email, password) => {
    const loginValidate = await validateLogin(email, password);
    if (loginValidate !== true) throw loginValidate;

    const token = jwt.sign({ data: email }, secret, jwtConfig);

    return token;
  },
};