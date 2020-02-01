const authController = {};

authController.setCookie = (req, res, next) => {
  if (req.query.user === 'codesmith' && req.query.pass === 'ilovetesting'){
    // add a cookie to the browser to authenticate
    res.cookie('token', 'admin');
    return next();
  } else {
    res.send('unsuccessful login attempt');
  }
};

authController.checkCookie = (req, res, next) => {
  const cookies = req.cookies;
  if (cookies['token'] === 'admin') {
    return next();
  } else {
    res.send('You must be signed in to view this page.')
  }
};

module.exports = authController;
