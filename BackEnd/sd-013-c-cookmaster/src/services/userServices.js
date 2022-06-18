const jwt = require('jsonwebtoken');

const { 
  registerUser,
  getUser } = require('../models/usersModels');
const { 
  registerUserValidations, 
  loginUserValidations } = require('../utils/functions/validates');
    
require('dotenv').config();

const secret = process.env.SECRET || 'secret';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const registerUSerService = async (user) => {
  const userValidation = await registerUserValidations(user);
  if (userValidation) {
    return userValidation;
  }

  const { _id } = await registerUser(user);

  const resgistredUser = { user: { role: 'user', _id, name: user.name, email: user.email } };
  return resgistredUser;
};

const loginUserService = async (email, password) => {
  const user = await getUser(email);
  
  const loginValitation = await loginUserValidations(email, password, user);
  if (loginValitation) {
    const token = jwt.sign({ data: email }, secret, jwtConfig);

    return token;
  }
  return loginValitation;
};

module.exports = {
  registerUSerService,
  loginUserService,
};