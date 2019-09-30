const authController = { };

authController.verifyUser = (req, res, next) => {
  if (
    !req.body
    || req.body.user !== 'codesmith'
    || req.body.pass !== 'ilovetesting'
  ) {
    return res.status(400).send('unsuccessful login attempt');
  }
  return next();
};

authController.setCookie = (req, res, next) => {
  res.cookie('token', 'admin', { httpOnly: true });
  return next();
};

authController.verifyCookie = (req, res, next) => {
  const { token } = req.cookies;
  if (!token || token !== 'admin') return res.send('You must be signed in to view this page');
  return next();
}

module.exports = authController;
