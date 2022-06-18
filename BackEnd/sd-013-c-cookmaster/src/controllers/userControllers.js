const { 
  registerUSerService,
  loginUserService } = require('../services/userServices');

const { created, success } = require('../utils/dictionary/statusCode');

const registerUserController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
      const user = await registerUSerService({ name, email, password });

      return res.status(created).json({ ...user });
  } catch (error) {
    return next(error);
  }
};

const loginUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await loginUserService(email, password);

    return res.status(success).json({ token });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  registerUserController,
  loginUserController,
};
