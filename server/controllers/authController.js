authController = {};

authController.verifyUser = (req, res, next) => {
  const { user, pass } = req.body;
  if(user === 'codesmith' && pass === 'ilovetesting'){
    return res.cookie('token', 'admin').redirect('/secret')
  } else{
    res.locals.login = 'unsuccessful login attempt'
    return next();
  }
}

module.exports = authController;
