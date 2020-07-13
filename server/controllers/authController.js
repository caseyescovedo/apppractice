const User = require('../models/User');

const checkLogin = (req, res, next) => {
  try {
    if (req.body.user === 'codesmith' && req.body.pass === 'ilovetesting') {
      res.locals.msg = 'successful login';
      return res.cookie('token', 'admin').redirect('/secret');
    } else {
      res.locals.msg = 'unsuccessful login attempt';
      next();
    }
  } catch (err) {
    console.log(err.message);
  }
};

const checkAuthToken = (req, res, next) => {
  console.log('req.body', req.body);
  console.log('req.cookies', req.cookies);
  next();
};

module.exports = { checkLogin, checkAuthToken };
