const routes = require('express').Router();

const { loginController } = require('../controllers/loginController');

routes.post(
  '/',
  loginController,
);

module.exports = routes;