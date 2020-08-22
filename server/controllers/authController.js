const authController = {};

// The only successful login credentials should be
// a user of codesmith and a pass of ilovetesting.
// Providing these credentials will redirect to the secret page route as before.
// Any other credentials (or none at all) will send the string unsuccessful login attempt.
authController.logIn = (req, res, next) => {
  if (req.body.user === 'codesmith' && req.body.pass === 'ilovetesting') {
    res.redirect('/secret');
  } else {
    res.send('unsuccessful login attempt');
  }
  next();
};

// Providing the correct login credentials should set a cookie on the client
// with a key of token and a value of admin
authController.setCookie = (req, res, next) => {
  res.cookie('token', 'admin');
  next();
};

module.exports = authController;
