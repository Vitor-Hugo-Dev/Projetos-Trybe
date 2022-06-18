const routes = require('express').Router();

const {
  createUSerController,
  getUsersByRoleController,
  // getUserByemailController,
  // getUserByIdController,
  // updateUserController,
  // deleteUserController,
} = require('../controllers/usersControllers');

routes.post(
  '/',
  createUSerController,
);

routes.get('/search?', getUsersByRoleController);

// routes.get(
//   '/:role',
//   getByRoleController,
// );

module.exports = routes;