const authController = {};

//set cookie if user logs in with correct credentials
authController.setCookie = (req, res, next) => {
  res.cookie('token', 'admin');
  return next();
};

//check for correct user and password
authController.authenticate = (req, res, next) => {
  if(req.body.username === 'codesmith' && req.body.password === 'ilovetesting') {
    res.locals.success = true;
    return next();
  } else {
    res.redirect('http://localhost:3333/').send('You must be signed in to view this page')
  };
};

//check for valid cookie
authController.checkCookie = (req, res, next) => {
  if(req.cookies.token === 'admin') return next();
  res.status(401).json('You must be signed in to view this page');
};

module.exports = authController;
