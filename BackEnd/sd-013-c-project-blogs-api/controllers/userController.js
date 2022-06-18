const { 
  createUserServices,
  getUsersServices,
  getUserByIdServices, 
  deleteUserServices } = require('../services/userService');
const { created, success, noContent } = require('../utils/statusCode');

module.exports = {
  createUSerController: async (req, res, next) => {
    const {
      displayName,
      email,
      password,
      image,
    } = req.body;

    try {
      const user = await createUserServices({
        displayName,
        email,
        password,
        image,
      });

      return res.status(created).json(user);
    } catch (error) {
      return next(error);
    }
  },
  getUserController: async (req, res, next) => {
  try {
    const users = await getUsersServices();
    
    return res.status(success).json(users);
  } catch (error) {
    return next(error);
  }
  },
  getUserByIdController: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await getUserByIdServices(id);
      return res.status(success).json(user);
    } catch (error) {
      return next(error);
    }
  },
  deleteUserController: async (req, res, next) => {
    try {
      const { id } = req.user;
      await deleteUserServices(id);

      return res.status(noContent).end();
    } catch (error) {
      return next(error);
    }
  },
};
