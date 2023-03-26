const { UnauthenticatedError } = require('../errors/index');

const jwt = require('jsonwebtoken');
const jwtAuth = (req, res, next) => {
  //Get authorization header
  const authHeader = req.headers.authorization;
  //Check if header is valid
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError("You don't have access to this route");
  }
  //Grab token value from header
  const token = authHeader.split(' ')[1];
  //Verify token value
  jwt.verify(token, process.env.JWT_SECRET);
  return next();
};

module.exports = jwtAuth;
