
const authController = {};

authController.verifyLogin = (req, res, next) => {
  const { user, pass } = req.body;

  if (user === 'codesmith' && pass === 'ilovetesting') {
    res.locals.success = 'ok';
  } else {
    res.locals.error = 'unsuccessful login attempt';
  }
  return next();
};

module.exports = authController;
