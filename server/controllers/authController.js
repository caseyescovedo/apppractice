
const authController = {};

authController.login = (req, res, next) => {
  const { user, pass } = req.body;
  if (user === 'codesmith' && pass === 'ilovetesting') {
    return res.cookie('token', 'admin').redirect('/secret');
  }
  return res.send('unsuccessful login attempt');
};

authController.checkCookie = (req, res, next) => {
  if (req.cookies.token === 'admin') {
    return next();
  }
  return res.send('You must be signed in to view this page');
};

module.exports = authController;
