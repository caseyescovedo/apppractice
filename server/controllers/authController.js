const authController = {};

authController.checkUserInput = (req, res, next) => {
  res.locals.user = req.body;
  return next();
};

authController.checkCookie = (req, res, next) => {
  if (req.cookies.token === 'admin') {
    console.log('good cookie');
    return next();
  } else {
    res.status(401).send('You must be signed in to view this page');
    return next(new Error('bad cookie'));
  }
};
module.exports = authController;
