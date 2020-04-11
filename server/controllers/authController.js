const authController = {};
authController.setCookie = (req, res, next) => {
  res.cookie = `pass=${req.body.pass}`;
  return next();
};

authController.validate = () => {};
module.exports = authController;
