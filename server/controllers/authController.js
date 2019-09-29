

const authController = {};

authController.isLoggedIn = (req, res, next) => {
  res.locals.isLoggedIn = true;

  next();
}

module.exports = authController;
