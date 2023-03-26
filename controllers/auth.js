const User = require('../models/users');
const { StatusCodes } = require('http-status-codes');
const { UnauthenticatedError, BadRequestError } = require('../errors/index');

const registerUser = async (req, res) => {
  const { username, password, email } = req.body;
  //Checks if there was a valid email and username
  if (!username || !email) {
    console.log('There was an error');
    throw new BadRequestError('Please input a valid username and email');
  }
  //Checks if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new BadRequestError('That email already exists');
  }
  const user = await User.create({ ...req.body, username, email, password });
  const token = await user.createJWT();
  res.status(StatusCodes.OK).json({ user, token });
};

const loginUser = (req, res) => {
  res.send('login user');
};

const getRegistered = async (req, res) => {
  res.send('get registered gotten');
};

module.exports = { registerUser, loginUser, getRegistered };
