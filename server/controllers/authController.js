const authController = {};

// Verify that the sign-in name was 'codesmith' and p/w was 'ilovetesting'.
authController.verifyUser = (req, res, next) => {
  // console.log('(authContrl.verifyUser) req.body:', req.body);
  

  if (req.body.user === 'codesmith' && req.body.pass === 'ilovetesting') {
    // If successful, set cookie: key of token and a value of admin.
    // And redirect to /secret.
    res.cookie('token', 'admin');
    return next();
  } else {
    // If verification fails, send the str 'unsuccessful login attempt'.
    const err = {message: 'unsuccessful login attempt'};
    return next(err);
  }
};

authController.verifyCookies = (req, res, next) => {
  console.log('what is the cookie?', req.cookies);
  if (req.cookies.token === 'admin') return next();
  else {
    // If verification fails, send the following str as err msg.
    const err = {message: 'You must be signed in to view this page'};
    return next(err);
  }
}

module.exports = authController;
