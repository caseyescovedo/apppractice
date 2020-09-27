const authController = {};

authController.authenticate = (req, res, next) => {
  if(req.body.user === 'codesmith' && req.body.pass === 'ilovetesting') {
    res.locals.auth = 'success';
  }
  else {
    res.locals.auth = 'failure';
  }
  return next();
}

module.exports = authController;
