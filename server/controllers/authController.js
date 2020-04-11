const authController = {};
authController.setCookie = (req, res, next) => {
  res.cookie = `pass=${req.body.pass}`;
  return next();
};
module.exports = authController;
