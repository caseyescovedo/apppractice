const authController = {};

authController.verify = (req, res, next) => {
  const { user, pass } = req.body
  if(user === 'codesmith' && pass === 'ilovetesting'){
    res.cookie('token', 'admin')
    next();
  } else {
    return 'unsuccessful login attempt';
  }
} 

module.exports = authController