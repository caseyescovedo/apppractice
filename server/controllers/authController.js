const authController = {};

authController.verifyCredentials = (req, res, next) => {
  if (req.body.user === 'codesmith' && req.body.pass === 'ilovetesting') {
    return next();
  } else {
    res.send('unsuccessful login attempt');
  }
};

authController.setCookie = (req, res, next) => {
  res.cookie('token', 'admin');
  return next();
};

authController.verifyCookie = (req, res, next) => {
  if (req.cookies.token === 'admin') {
    return next();
  } else {
    res.send('You must be signed in to view this page');
  }
};

module.exports = authController;
