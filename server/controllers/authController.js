const authController = {};

//check if username and password is correct
authController.validateCredentials = (req, res, next) => {
  const { user, pass } = req.body;
  //make username case-insensitive, why not? life is hard enough as is
  if (user.toLowerCase() === 'codesmith' && pass === 'ilovetesting') {
    //if so, give them an admin cookie
    res.cookie('token', 'admin', { maxAge: 300000 });
    return next();
  }
  res.status(401).json('unsuccessful login attempt');
};

//check if client has admin cookie
authController.isLoggedIn = (req, res, next) => {
  if (req.cookies.token === 'admin') return next();
  else res.status(401).send('You must be signed in to view this page');
};

module.exports = authController;
