const Tasks = require('../models/TaskModel.js');

const authController = {};

authController.validateCredentials = (req, res, next) => {
  const { user, pass } = req.body;
  if (user.toLowerCase() === 'codesmith' && pass === 'ilovetesting') {
    res.cookie('token', 'admin', { maxAge: 300000 });
    return next();
  }
  res.status(401).json('unsuccessful login attempt');
};

authController.isLoggedIn = (req, res, next) => {
  if (req.cookies.token === 'admin') return next();
  else res.status(401).send('You must be signed in to view this page');
};

module.exports = authController;
