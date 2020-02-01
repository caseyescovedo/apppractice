const db = require('../models/TaskModel.js');

const authController = {};



authController.validateUser = (req, res, next) => {
  // for purposes of this we are only checking if user and pass = codesmith/ilovetesting 

  // get the username and password from the client 
  const { user, pass } = req.body;

  // redirect to the secret page if these exist
  // if more time connect to the database since these exist in my database
  if (user === 'codesmith' && pass === 'ilovetesting') {
    // send a cookie to user if they're successful

    // age to be set to 1 minute for testing purposes
    // when i put secure flag to true it disappeared from my network, interesting and good to know
    res.cookie('token', 'admin', {
      maxAge: 60000,
      // secure: true,
      httpOnly: true,
    })

    return res.redirect('/secret');
  }
  else {
    return res.json('Unsuccessful login attempt');
  }

}

authController.validateCookie = (req, res, next) => {
  console.log(req.cookies);

  // if the cookie exists and its value is admin
  if (req.cookies.token && req.cookies.token === 'admin') {
    return next();
  }

  // otherwise you're outta luck kid
  else {
    res.json('You must be signed in to view this page');
  }
}

module.exports = authController;
