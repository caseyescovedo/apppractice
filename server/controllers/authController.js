const authController = {};

authController.verifyUser = (req, res, next) => {
  if (req.body.user === 'codesmith' && req.body.pass === 'ilovetesting'){
    res.cookie('token', 'admin');
    return next();
  } else {
    res.status(400).send('unsuccessful login attempt');
  }
}

authController.checkCookie = (req, res, next) => {
  if (req.cookies.token === 'admin'){
    return next()
  } else {
    res.status(400).send('You must be signed in to view this page')
  }
}

module.exports = authController;
