/* eslint-disable no-console */
const authController = {};

authController.getUser = (req, res, next) => {
  const user = 'codesmith';
  const pass = 'ilovetesting';
  if (req.params.user !== user || req.params.pass !== pass) {
    return 'unsuccessful login attempt';
  }
  return next();
};

authController.createCookie = (req, res, next) => {
  res.cookie('Authenticated', true, { token: 'admin' });
  return next();
};

authController.findCookie = (req, res, next) => {
  const { cookie } = req;
  if (cookie.Authenticated === 'true') return next();
  res.json({ log: 'Login incorrect' });
};

module.exports = authController;
