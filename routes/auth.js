const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getRegistered,
} = require('../controllers/auth');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/register').get(getRegistered);

module.exports = router;
