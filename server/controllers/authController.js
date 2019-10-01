const authController = {};


authController.signin = (req, res, next) => {

  const { user, pass } = req.body;

  if (user === 'codesmith' && pass === 'ilovetesting') {
    res.cookie('token', 'admin');
    return next();
  }
  res.send('unsuccessful login attempt')
  next();
}


authController.session = (req, res, next) => {
  if (req.cookies.token === 'admin') return next();
  else res.send('You must be signed in to view this page!')
}

module.exports = authController;
