const { Users } = require('../models');
const { validateUserCreate, validateGetById, validateUserDelete } = require('../utils/validates');

module.exports = {
  createUserServices: async (user) => {
    const validate = await validateUserCreate(user);
    if (validate !== true) throw validate;
    
    const userCreate = await Users.create(user);
    return userCreate;
  },
  getUsersServices: async () => {
    const users = await Users.findAll();

    return users;
  },
  getUserByIdServices: async (id) => {
    const validate = await validateGetById(id);
    if (validate !== true) throw validate;

    const user = await Users.findByPk(id);
    return user;
  },
  deleteUserServices: async (id) => {
    await validateUserDelete(id);
    
    await Users.destroy({ where: { id } });

    return true;
  },
};
