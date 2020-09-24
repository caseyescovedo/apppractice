const db = require('../models/TaskModel');

const authController = {};

authController.login = (req, res, next) => {
  const { user, password } = req.body;
  if (user === 'codesmith' && password === 'ilovetesting') {
    return res.cookie('token', 'admin').redirect('/secret');
  }
  res.locals.failed = 'unsuccessful login attempt';
  return next();
};

module.exports = authController;
