
const authController = {};

authController.verifyUser = (req, res, next) => {
  const { user, pass } = req.body;
  try {
    if (user === 'codesmith' && pass === 'ilovetesting') {
      const token = res.cookie('token', 'admin');
      res.locals.token = token;
      return next();
    }
  } catch (err) {
    res.json('unsuccessful login attempt');
    console.log(`Please use a diff username/password: ${err}`);
  }
};

authController.verifyToken = (req, res, next) => {
  const { token } = req.cookies;
  try {
    if (token === 'admin') {
      return next();
    }
  } catch (err) {
    res.json('You must be signed in to view this page');
    console.log(`You must be signed in to view this page: ${err}`);
  }
};

module.exports = authController;
