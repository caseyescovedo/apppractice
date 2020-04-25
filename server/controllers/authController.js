const authController = {};

// login
authController.login = (req, res, next) => {
  const usernameAttempt = req.body.user;
  const passwordAttempt = req.body.pass;

  if (usernameAttempt === 'codesmith' && passwordAttempt === 'ilovetesting') {
    next();
  } else res.status(200).send('unsuccessful login attempt');
}

// cookie

module.exports = authController;
