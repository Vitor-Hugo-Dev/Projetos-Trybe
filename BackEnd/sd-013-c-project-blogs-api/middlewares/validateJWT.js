// validateJWT.js
const jwt = require('jsonwebtoken');
const { unauthorized } = require('../utils/statusCode');
const { Users } = require('../models');

require('dotenv').config();

const secret = process.env.SECRET || 'secret';
module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(unauthorized).json({ message: 'Token not found' });
  }
  try {
    const decoded = jwt.verify(token, secret);
    const user = await Users.findOne({ where: { email: decoded.data } });
    if (!user) {
      return res
      .status(unauthorized)
      .json({ message: 'Expired or invalid token' });
    }
    req.user = user;
    return next();
  } catch (err) {
    console.log(err);
    return res.status(unauthorized).json({ message: 'Expired or invalid token' });
  }
};