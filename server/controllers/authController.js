const authController = {};

authController.authenticateUser = (req, res, next) => {
  const { user, pass } = req.body;
  if (user === 'codesmith' && pass === 'ilovetesting') {
    res.locals.authenticated = true;
    res.cookie('token', 'admin', { httpOnly: true });
  }
  return next();
};

module.exports = authController;
