authController = {};

authController.auth = (req, res, next) => {
  const goodCreds = {
    user: 'codesmith',
    pass: 'ilovetesting',
  };
  const loginCreds = req.body;
  console.log(loginCreds);
  if (
    loginCreds.user === goodCreds.user &&
    loginCreds.pass === goodCreds.pass
  ) {
    res.locals.token = 'admin';
    res.locals.auth = true;
    return next();
  }

  throw { staus: 403, message: 'unsuccessful login attempt' };
};

module.exports = authController;
