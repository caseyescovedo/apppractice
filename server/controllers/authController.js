const path = require("path");
const authController = {};

authController.login = (req, res, next) => {
  const { user, pass} = req.body
  if (user === 'codesmith' && pass === 'ilovetesting') {
    next()
  } else {
    return res.status(500).send('unsuccessful login attempt')
    next()
  }
}

authController.setCookie = (req, res, next) => {
  res.cookie('token', 'admin')
  next();
}

authController.verifyUser = (req, res, next) => {
  if (req.cookies.token === 'admin') {
    next();
  } else {
    return res.status(500).send('You must be signed in to view this page')
  }
}

module.exports = authController;