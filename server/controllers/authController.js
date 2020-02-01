
const authController = {};
// middlware to verify user
authController.verifyUser = (req, res, next) => {
  const { user, pass } = req.body;
  // checking to see if user and pass match
  if (user === 'codesmith' && pass === 'ilovetesting') {
    return next();
  }
  // if not return unsuccesful login message
  return res.send('unsuccesful login attempt');
};

// middlware to set cookies after user has been verified
authController.setCookie = (req, res, next) => {
  // set cookie with key of token and value of admin
  res.cookie('token', 'admin');
  return next();
};

// middleware to verify if cookie is what we expect
authController.verifyCookie = (req, res, next) => {
  if (req.cookies.token === 'admin') {
    return next();
  }
  // if not send message telling user to log in
  return res.send('You must be signed in to view this page');
};

module.exports = authController;
