const {
  createUSerService,
  getUserByemailService,
  getUserByIdService,
  updateUserService,
  getUsersByRole,
  // deleteUserService,
} = require('../services/usersServices');
const { created, success } = require('../utils/statusCode');

module.exports = {
  createUSerController: async (req, res, next) => {
    try {
      const user = req.body;
      const createUser = await createUSerService(user);
      return res.status(created).json(createUser);
    } catch (error) {
      return next(error);
    }
  },
  getUserByemailController: async (req, res, next) => {
    try {
      const email = req.body;
      const user = await getUserByemailService(email);

      return res.status(success).json(user);
    } catch (error) {
      return next(error);
    }
  },
  getUserByIdController: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await getUserByIdService(id);

      return res.status(success).json(user);
    } catch (error) {
      return next(error);
    }
  },
  getUsersByRoleController: async (req, res, next) => {
    try {
      const { role } = req.query;
      const users = await getUsersByRole(role);

      return res.status(success).json(users);
    } catch (error) {
      return next(error);
    }
  },
  updateUserController: async (req, res, next) => {
    try {
      const { id } = req.params;
      const update = req.body;
      const updatedUser = await updateUserService(update, id);

      return res.status(success).json(updatedUser);
    } catch (error) {
      return next(error);
    }
  },
  // getByRoleController: async (req, res, next) => {
  //   try {
  //     const { role } = req.params;
  //     const answer = await getByRoleService(role);
  //     return res.status(success).json(answer);
  //   } catch (error) {
  //     console.error(error.message);
  //     next(error);
  //   }
  // },
  // deleteUserController: async (req, res, next) => {
  //   try {
  //     const { id } = req.params;
  //     const { role } = req.user;
  //     await deleteUserService(id, role);

  //     return res.status(noContent).end();
  //   } catch (error) {
  //     return next(error);
  //   }
  // },
};
