const db = require('../models/TaskModel.js');

const authController = {};

authController.verifyUser = (req, res, next) =>{

if (req.body.user !== 'codesmith' && req.body.password !== 'password'){
  res.status(200).send('unsuccessful login attempt');
}

 next();
}

authController.setCookie = (req, res, next) => {
  res.cookie('token', 'admin');
  return next();
}

authController.checkCookie = (req, res, next) =>{
  if (!req.headers.cookie){
    res.status(200).send("You must be signed in to view this page")
  }

  return next();
}

module.exports = authController;