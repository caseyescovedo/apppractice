const authController = {};

authController.authenticateUser = (req, res, next) => {
  const { user, pass } = req.body;
  if (user === 'codesmith' && pass === 'ilovetesting') {
    res.locals.authenticated = true;
    res.cookie('token', 'admin', { httpOnly: true });
  }
  next();
};

authController.checkCookie = (req, res, next) => {
  if (req.cookies.token === 'admin') res.locals.session = true;
  next();
};

module.exports = authController;
