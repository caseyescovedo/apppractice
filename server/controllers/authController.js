const db = require('../models/TaskModel');

const authController = {};

authController.getUserInfo = (req, res, next) => {
  // I couldn't figure out where to get the username and password
  const { user, pass } = req.body;
  // if (user === 'codesmith' && pass === 'ilovetesting') {
    res.cookie('token', 'admin');
    return next();
  // }
  // return next('unsuccessful login attempt');
};

authController.checkCookie = (req, res, next) => {
  if (req.cookies.token !== 'admin') {
    return next('You must be signed in to view this page');
  }
  return next();
};

module.exports = authController;
