const md5 = require('md5');
const jwt = require('jsonwebtoken');
const { User } = require('../database/models');
const {
  createUserValidations,
  getUserValidations,
  updateUserValidations,
} = require('./validations/usersValidations');

require('dotenv').config();

// token generate
const secret = process.env.SECRET || 'secret';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

module.exports = {
  createUSerService: async ({ name, email, password }) => {
    const validate = await createUserValidations({
      name,
      email,
      password,
    });

    if (validate !== true) throw validate;

    const encriptedPassword = md5(password);
    const { id, role } = await User.create({
      name,
      email,
      password: encriptedPassword,
      role: 'customer',
    });

    const token = jwt.sign({ id, email }, secret, jwtConfig);
    
    return { name, email, role, token };
  },
  getUserByemailService: async (email) => {
    const currentUser = await User.findOne({ where: { email } });

    const validate = getUserValidations(currentUser);
    if (!validate) throw validate;

    return currentUser;
  },
  getUserByIdService: async (id) => {
    const currentUser = await User.findByPk(id);

    const validate = getUserValidations(currentUser);
    if (!validate) throw validate;

    return currentUser;
  },
  getUsersByRole: async (role) => {
    const user = await User.findAll({ where: { role } });

    return user;
  },
  updateUserService: async (update, id) => {
    const validate = updateUserValidations(update);
    if (validate !== true) throw validate;

    await User.update(update, { where: id });
    const updatedUser = await User.findByPk(id);

    return updatedUser;
  },
  // getByRoleService: async (role) => {
  //   const answer = await User.findAll({ 
  //     attribute: { exclude: ['password']},
  //     where: { role }, 
  //   });
  //   return answer;
  // },
  // deleteUserService: async (id, role) => {},
};
