const AuthController = {};

AuthController.verifyUser = (req, res, next) => {
  if (req.body.user === 'codesmith' && req.body.pass === 'ilovetesting') {
    return next();
  }
  return res.status(403).send('unsuccessful login attempt');
};

AuthController.setCookie = (req, res, next) => {
  res.cookie('token', 'admin');
  return next();
};

AuthController.userLogin = (req, res, next) => {
  // ! do I need a return or next here since it's the last middleware in the chain?
  return res.redirect('/secret');
};

AuthController.checkCookie = (req, res, next) => {
  // checks if user has a token 'admin' in their cookies before rendering /secret page
  if (req.cookies.token === 'admin') {
    return next();
  }
  return res.status(403).send('You must be signed in to view this page');
};

module.exports = AuthController;
