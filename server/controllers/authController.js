const authController = {};

authController.verifyUser = (req, res, next) => {
  const {user, pass} = req.body
  if (user === 'codesmith' && pass === 'ilovetesting') {
    res.redirect('/secret')
    next();
  } else {
    res.send('unsuccessful login attempt')
    next();
  }
}

authController.setCookie = (req, res, next) => {
  res.cookie('token', 'admin')
  next();
}

module.exports = authController
