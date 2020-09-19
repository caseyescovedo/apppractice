const express = require('express');
const authController = express.Router();

authController.verifyUser = (req, res, next) => {
  // const { username, password } = req.body;
  // if (username === 'codesmith' && password === 'ilovetesting' || req.cookies === {'token': 'admin'}) return next();
  // else res.send('You must be signed in to view this page');
  return next();
}

module.exports = authController;