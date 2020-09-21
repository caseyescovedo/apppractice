const express = require('express');
const authController = express.Router();

authController.verifyUserLogin = (req, res, next) => {
  console.log(req.body);
  const { user, pass} = req.body;
  if (user === 'codesmith' && pass === 'ilovetesting') return next();
  else res.send(`unsuccessful login attempt`);
}

authController.verifyUserAlreadyLoggedIn = (req, res, next) => {
  if (req.cookies.name === 'token' && req.cookies.value === 'admin') return next();
  else res.send(`You must be signed in to view this page`);
};

module.exports = authController;