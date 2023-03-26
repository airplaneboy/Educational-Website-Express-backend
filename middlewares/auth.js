const jwt = require('jsonwebtoken');
const jwtAuth = (req, res, next) => {
  const authHeader = req.headers.authentication;
  const token = authHeader.split(' ')[1];
  console.log(token);
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = jwtAuth;
