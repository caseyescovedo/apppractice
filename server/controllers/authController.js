const authController = {};

authController.checkCredentials = (req, res, next) => {
  const { user, pass } = req.body;
  if (user === 'codesmith' && pass === 'ilovetesting') {
    res.cookie('token', 'admin');
    next();
  } else res.status(404).send('unsuccessful login attempt');
};

authController.checkIfSignedIn = (req, res, next) => {
  if (req.cookies.token === 'admin') next();
  else res.status(404).send('You must be signed in to view this page');
};

module.exports = authController;
