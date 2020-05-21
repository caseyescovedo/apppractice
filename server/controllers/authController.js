const authController = {};

authController.verifyUser = (req, res, next) => {
  const { user, pass } = req.body;
  if (user === 'codesmith' && pass === 'ilovetesting') {
    res.cookie('token', 'admin');
    return res.redirect('/secret');
  }
  return next();
};

authController.checkForCookie = (req, res, next) => {
  if (!req.cookies || req.cookies.token !== 'admin') {
    return res.status(401).send('You must be signed in to view this page');
  }
  return next();
};

module.exports = authController;
