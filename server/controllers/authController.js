const authController = {};

// verify user using user and pass from the request body
// should be equal to codesmith and ilovetesting
// if so, set cookie of token, admin
authController.verifyUser = (req, res, next) => {
  const { user, pass } = req.body;
  if (user === 'codesmith' && pass === 'ilovetesting') {
    res.cookie('token', 'admin');
    res.redirect('/secret');
  } else {
    console.log('unsuccesful login attempt');
  }
  return next();
};

module.exports = authController;
