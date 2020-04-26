const authController = {};

authController.verifyUser = (req, res, next) => {
 
  if (req.body.user === 'codesmith' && req.body.pass === 'ilovetesting') {
    res.locals.success = true;
    return next();
  } else {
    res.locals.success = false;
    return next();
  }
}

authController.setCookie = (req, res, next) => {
  res.cookie('token', 'admin', {
    maxAge: 360000,
    httpOnly: true,
  });

  return next();
}

authController.isLoggedIn = (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    res.locals.loggedIn = true;
    return next();
  } else {
    res.locals.loggedIn = false;
    return next();
  }
}

module.exports = authController;
