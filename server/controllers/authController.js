const db = require('../models/TaskModel.js');

const authController = {};

authController.verifyUser = (req, res, next) =>{
  const username = req.body.user;
  const password = req.body.password;

  if (username !== 'codesmith' && password !== 'password'){
    res.status(200).send('unsuccessful login attempt');
    res.end();
  } else {
    next();
  }
}

authController.setCookie = (req, res, next) => {
  res.cookie('token', 'admin');
  next();
}



// cannot get my checkCookies to work :-( I am stuck in an infinite loop
authController.checkCookie = (req, res, next) =>{

  if (req.headers.cookie !== "token=admin"){
    res.status(200).send("You must be signed in to view this page")
  } else {
    next();
  }
}

module.exports = authController;