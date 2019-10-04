const pool = require ('../models/TaskModel.js')

const authController = {};

authController.verifyUser = (req, res, next) => {
  const {user, pass} = req.body;
  if (user === 'codesmith' && pass === 'ilovetesting') res.locals.verified = true;
  else res.locals.verified = false;
  return next()
}

authController.setCookie = (req, res, next) => {
  if (res.locals.verified === true) {
    res.cookie('token', 'admin');
    return next ();
  } else return next ()
}

authController.checkCookie = (req, res, next) => {
  const { cookies } = req.body.header
  console.log(cookies)
}


module.exports = authController;
