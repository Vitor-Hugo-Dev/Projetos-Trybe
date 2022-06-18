const md5 = require('md5');

const cryptoPassword = (password) => md5(password);

module.exports = cryptoPassword;
