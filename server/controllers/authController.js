const authController = {};

authController.authenticate = (req, res, next) => {
  console.log(req.body);
  return next();
}

module.exports = authController;
