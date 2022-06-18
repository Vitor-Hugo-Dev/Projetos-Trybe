// const crypto = require('crypto');
const validator = require('validator');
const { generateToken } = require('../utils');

module.exports = async (req, res) => {
const { email, password } = req.body;
const token = await generateToken();
if (!email) {
  return res.status(400).json({
    message: 'O campo "email" é obrigatório',
  });
} 
if (!validator.isEmail(email)) {
  return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
}
if (!password) {
  return res.status(400).json({ message: 'O campo "password" é obrigatório' });
}
if (!validator.isLength(password, { min: 6 })) {
  return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
}
res.status(200).json({ token });
};