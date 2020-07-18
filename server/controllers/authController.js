const authController = {};

authController.checkCredentials = (req, res, next) => {
  const { user, pass} = req.body;
  if(user == 'codesmith' && pass == 'ilovetesting'){
    res.cookie('token', 'admin');
    return next();
  } else {
    res.cookie('token', 'no-access')
    return next();
  }
};

authController.checkCookies = (req, res, next) => {
  if(req.cookies.token) {
    const { token } = req.cookies;
    if(token == 'admin'){
      return next();
    } else res.redirect('/failedAuth');
  }
};

module.exports = authController;
