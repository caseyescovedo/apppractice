const authController = {};

authController.authenticate = (req, res, next) => {
  const { user, pass } = req.body;
  console.log(req.body)
  if (user ===  'codesmith' && pass === 'ilovetesting'){
    console.log('successful login')
    return next()
  }
  else {
    res.json('unsuccessful login attempt')
  }
}


module.exports = authController;
