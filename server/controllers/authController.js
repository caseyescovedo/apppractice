const express = require('express');
const session = require('express-session');
const authController = {};

authController.validateUser = (req, res, next) => {
  // use this to validate cookies
  if (req.session.cookie.secret) return next();
  req.session.cookie.secret = 'shhhhh';
  return next();
};

module.exports = authController;