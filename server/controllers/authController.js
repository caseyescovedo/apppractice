const authController = {};

authController.checkUser = (req, res, next) => {
  const { user, pass } = req.body;
  if (user === 'codesmith' && pass === 'ilovetesting') {
    res.cookie('token', 'admin');
    res.redirect('/secret');
  } else {
    res.send('unsuccessful login attempt');
  }
  next();
};

authController.checkCookie = (req, res, next) => {
  if (req.cookies.token !== 'admin') res.send('You must be signed in to view this page');
  next();
};

module.exports = authController;
