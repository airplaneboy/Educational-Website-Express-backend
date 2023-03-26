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
  //Create user if user does not exist
  const user = await User.create({
    ...req.body,
    username,
    email,
    password: password.toString(),
  });
  //Create JWT token
  const token = await user.createJWT();
  //Response
  res.status(StatusCodes.CREATED).json({ user, token });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  //Checks if user exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError(
      'That user does not exist. You can register to create a new account'
    );
  }
  //Checks if inputted password matches password for user
  const isPasswordValid = await user.verifyPassword(password);
  if (!isPasswordValid) {
    throw new UnauthenticatedError('Incorrect password');
  }
  //Create JWT Token
  const token = user.createJWT();
  //Set req.user
  req.user = user;
  //Response
  res.status(StatusCodes.OK).json({ user: req.user, token });
};

module.exports = { registerUser, loginUser };
