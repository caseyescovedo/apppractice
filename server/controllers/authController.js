const authController = {};

authController.credCheck = (req, res, next) => {
  const { user, pass } = req.body;
  if (user === 'codesmith' && pass === 'ilovetesting') {
    return res.cookie('token', 'admin').redirect('/secret');
  } else {
    res.send('unsuccessful login attempt')
  }
} 

authController.cookieCheck = (req, res, next) => {
  if (req.cookies.token === 'admin') return next();
  else res.send('You must be signed in to view this page')
} 

module.exports = authController;
