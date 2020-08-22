const authController = {};

authController.verifyUser = (req, res, next) => {
  const { user, pass } = req.body;

  const credentials = { userName: 'codesmith', password: 'ilovetesting' };

  if (user === credentials.userName && pass === credentials.password) {
    res.cookie('token', 'admin');
    return next();
  } else {
    res.send('unsuccessful login attempt');
  }
};

authController.checkCookie = (req, res, next) => {
  console.log(req.cookies);
  if (req.cookies['token'] === 'admin') {
    next();
  } else {
    res.send('You must be signed in to view this page');
  }
};

module.exports = authController;
