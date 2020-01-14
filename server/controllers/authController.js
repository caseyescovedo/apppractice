const authController = {};

authController.verify = (req, res, next) => {
  const { token } = req.cookies;
  if ( token === 'admin') res.redirect('/secret');
  return next();
};

module.exports = authController;
