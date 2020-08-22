const authController = {};

authController.checkCreds = (req, res, next) => {
  const { user, pass } = req.body;
  if (user === 'codesmith' && pass === 'ilovetesting') {
    return next();
  } else {
    return next('unsuccessful login attempt');
  }
}

authController.cookie = (req, res, next) => {
  res.cookie('token', 'admin');
  return next();
}

authController.checkCookie = (req, res, next) => {
  if (req.cookies.token === 'admin') {
    return next();
  } else {
    return next('You must be signed in to view this page');
  }
}

module.exports = authController;
