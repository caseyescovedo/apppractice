const db = require('../models/TaskModel.js');

const authController = {};

authController.validateUser = (req, res, next) => {
  if (req.body.user === 'codesmith' && req.body.pass === 'ilovetesting') {
    res.cookie('token', 'admin');
  } else {
    res.send('unsuccessful login attempt');
  }
  return next();
};

authController.checkUser = (req, res, next) => {
  if (req.cookies.token === 'admin') {
    return next();
  } else {
    res.send('You must be signed in to view this page');
  }
};
module.exports = authController;
