const authController = {};

authController.authenticateUser = (req, res, next) => {
  const { user, pass } = req.body;
  res.locals.auth = user === 'codesmith' && pass === 'ilovetesting';
  return next();
};

module.exports = authController;
