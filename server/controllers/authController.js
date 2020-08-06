const authController = {};

authController.authenticateUser = (req, res, next) => {
  const { user, pass } = req.body;
  // set res.locals.auth to Boolean, where true IFF username & password are correct
  res.locals.auth = user === 'codesmith' && pass === 'ilovetesting';
  return next();
};

module.exports = authController;
