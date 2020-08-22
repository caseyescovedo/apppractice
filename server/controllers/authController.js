const User = require('../models/TaskModel');

const authController = {};

// authController.createUser = async (req, res, next) => {
//   const { username, password } = req.body;
//   try {
//     const create = await User.create({ username, password });
//     res.locals.create = create;
//     next();
//   } catch (err) {
//     console.log('this is error in create user: ', err);
//     // next(err);
//   }
// };

authController.signin = async (req, res, next) => {
  const { username, password } = req.body;
  if (username === undefined && password === undefined) return next();
  console.log('this is req body ya: ', username, password);
  if (username === 'codesmith' && password === 'ilovetesting') {
    next();
  } else {
    // res.locals.status = 401;
    res.status(401).send('unsuccessful login attempt');
  }
};

authController.setCookie = (req, res, next) => {
  console.log('setting cookie');
  res.cookie('token', 'admin');
  next();
};

authController.checkCookie = (req, res, next) => {
  console.log('cheking cookie: ', req.cookies);
  if (req.cookies.token === 'admin') {
    next();
  } else {
    res.status(401).send('You must be signed in to view this page');
  }
};

module.exports = authController;
