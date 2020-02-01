
const authController = {};

authController.checkUser = (req, res, next) => {
  // console.log('this is req', req);
  console.log('this is req.body', req.body);

  const { user, pass } = req.body;
  if (user === 'codesmith' && pass === 'ilovetesting') {
    res.cookie('token', 'admin');
    // console.log('hitting this');
    return next();
  }
  res.status(400).json('You must be signed in to view this page');
};

module.exports = authController;
