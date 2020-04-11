const authController = {};

const user = 'codesmith';
const password = 'ilovetesting';

authController.verifyUser = (req, res, next) => {
  if (req.body.user === user && req.body.password === password) {
    // set cookie
    res.cookie('token', 'admin');
    return next();
  } else {
    console.log('unsuccessful login attempt');
    next();
  }
}

module.exports = authController;
