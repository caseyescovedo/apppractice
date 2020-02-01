const authObject = {
  user: 'codesmith',
  pass: 'ilovetesting',
};

const authController = {};

authController.authenticate = (req, res, next) => {
  console.log('authenticate req body', req.body);
  if (authObject.user !== req.body.user && authObject.pass !== req.body.pass) {
    res.status(401).send('unsuccessful login attempt');
  }
  res.cookie('token', 'admin');
  next();
};

authController.checkCookie = (req, res, next) => {
  console.log('req cookies', req.cookies)
  if (req.cookies.token === 'admin') {
    next();
  } else {
    res.status(401).send('You must be signed in to view this page');
  }
};

module.exports = authController;
