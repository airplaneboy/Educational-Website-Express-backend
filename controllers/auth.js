const { StatusCodes } = require('http-status-codes');
const { unauthenticatedError } = require('../errors/index');

const registerUser = (req, res) => {
  res.send('register user');
};

const loginUser = (req, res) => {
  res.send('login user');
};

const getRegistered = async (req, res) => {
  res.send('get registered gotten');
};

module.exports = { registerUser, loginUser, getRegistered };
