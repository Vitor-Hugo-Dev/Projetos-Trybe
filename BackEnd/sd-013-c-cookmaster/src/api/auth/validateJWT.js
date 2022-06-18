// validateJWT.js
const jwt = require('jsonwebtoken');

require('dotenv').config();

const { getUser } = require('../../models/usersModels');
const { unauthorized } = require('../../utils/dictionary/statusCode');

const secret = process.env.SECRET || 'secret';
module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(unauthorized).json({ message: 'missing auth token' });
  }
  try {
    const decoded = jwt.verify(token, secret);
    const user = await getUser(decoded.data);
    if (!user) {
      return res
      .status(unauthorized)
      .json({ message: 'missing auth token' });
    }
    req.user = user;
    return next();
  } catch (err) {
    return res.status(unauthorized).json({ message: 'jwt malformed' });
  }
};