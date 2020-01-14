const authController = {};

authController.verifyPass = (req, res, next) => {
  const { user, pass } = req.body;

  if (user === 'codesmith' && pass === 'ilovetesting') {
    res.cookie('token', 'admin', { httpOnly: true });
    return next();
  }
  res.send('unsuccessful login attempt');
}

authController.verifyCookie = (req, res, next) => {
  if (req.cookies.token && req.cookies.token === 'admin') {
    return next();
  }
  res.send('You must be signed in to view this page')
}



module.exports = authController;
