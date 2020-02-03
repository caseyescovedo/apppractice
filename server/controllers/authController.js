const authController = {};

authController.addCookie = function(req, res, next) {
  res.cookie('cookie', 'yes a cookie');
  return next();
};

module.exports = authController;
