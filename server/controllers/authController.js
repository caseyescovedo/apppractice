
const authController = {};

authController.verifyUser = (req, res, next) => {
  const { user, pass } = req.body;

  if (user === 'codesmith' && pass === 'ilovetesting') {
    res.cookie('token', 'admin');
    return next();
  } else {
    res.send('Unsuccessful login attempt.');
    // res.redirect('/');
  }
}

authController.checkCookie = (req, res, next) => {
  const cookies = req.cookies;

  if (cookies.token === 'admin') {
    return next();
  } else {
    res.send('You must be signed in to view this page!');
  }
}

module.exports = authController;