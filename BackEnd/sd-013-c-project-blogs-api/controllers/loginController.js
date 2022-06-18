const { loginService } = require('../services/loginService');
const { success } = require('../utils/statusCode');

module.exports = {
  loginController: async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const token = await loginService(email, password);
      
      return res.status(success).json({ token });
    } catch (error) {
      return next(error);
    }
  },
};