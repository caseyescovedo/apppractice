const authController = {};

// check username and pw from req.body
// getting unsuccessful login attempts after inputting correct user/password
// im expecting this check to pass, set a cookie and send to client side
authController.checkUser = (req, res, next) => {
  if (req.body.user === 'codesmith' && req.body.pass === 'ilovetesting') {
    next();
  } else {
    res.send('unsuccessful login attempt');
  }
}

// setting the cookie
authController.setCookie = (req, res, next) => {
  res.cookie('token', 'admin').send('cookie has been set!')
  return next();
}

// server checks for valid cookie prior to sending to secret page
authController.checkCookie = (req, res, next) => {
  if (req.cookies.token === 'admin') {
    return next();
  } else {
    res.send('you must be signed in to view this page');
  }
}

module.exports = authController;
