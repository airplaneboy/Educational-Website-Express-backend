const User = require('../models/users');
const { StatusCodes } = require('http-status-codes');
const { unauthenticatedError } = require('../errors/index');

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.create(req.body);
  res.status(StatusCodes.OK).json(user);
};

const loginUser = (req, res) => {
  res.send('login user');
};

const getRegistered = async (req, res) => {
  res.send('get registered gotten');
};

module.exports = { registerUser, loginUser, getRegistered };
