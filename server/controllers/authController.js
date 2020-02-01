const authObject = {
  user: 'codesmith',
  pass: 'ilovetesting',
};

const authController = {};

authController.authenticate = (req, res, next) => {
  console.log('authenticate req body', req.body);
  if (authObject.user !== req.body.user && authObject.pass !== req.body.pass) {
    res.status(401).send('unsuccessful login attempt');
    next();
  }
  next();
};

module.exports = authController;
