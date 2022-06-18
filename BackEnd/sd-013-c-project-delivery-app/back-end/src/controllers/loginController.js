const { loginService } = require('../services/loginServices');
const { success } = require('../utils/statusCode');

const loginController = async (req, res, next) => {
  let login;
  try {
    login = await loginService(req.body);
  } catch (error) {
    console.error(error.message);
    return next(error);
  }
  return login.status 
  ? res.status(login.status).json({ message: login.message })
  : res.status(success).json(login);
};

module.exports = {
  loginController,
};