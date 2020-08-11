
const authController = {};

authController.verifyUser = (req, res, next) => {
  const { user, pass } = req.body;
  if (user === 'codesmith' && pass === 'ilovetesting') {
    return next();
  }
  return res.send('access denied!');
};

authController.setCookie = (req, res, next) => {
  res.cookie('token', 'admin');
  return next();
};

authController.checkCookie = (req, res, next) => {
  const { token } = req.cookies;
  if (token === 'admin') {
    return next();
  }
  return res.send('access denied!');
}


module.exports = authController;
