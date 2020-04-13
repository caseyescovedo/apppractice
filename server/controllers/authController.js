const authController = {};

authController.verify = (req, res, next) => {
  const {user, pass} = req.body
  if (user === 'codesmith' && pass === 'ilovetesting') {
    res.cookie('token', 'admin')
    next();
  } else {
    res.status(404).send('Unsuccessful login attempt')
    next();
  }
}

// authController.validateCookie = (req, res, next) => {
//   if (!req.cookies || !req.cookies.token || req.cookies.token !== 'admin') 
//   return res.status(404).send('You must be signed in to view this page');
//   next();
// }

module.exports = authController;
