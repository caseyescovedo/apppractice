// set a cookie here to be brought in as middleware in server.js
const authController = {};

// should have a key of 'token' and value of 'auth'
cookieController.setCookie = (req, res, next) => {
  res.cookie('token', 'auth', {
    expires: new Date(Date.now() + 900000),
    httpOnly: true
  });
  return next();
};

module.exports = authController;
