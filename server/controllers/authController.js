const authController = {};

authController.verifyUser = (req,res,next) => {
  const {username, password} = req.body;
  if(username === 'codesmith' && password === 'ilovetesting'){
    res.locals.verify = true;
    res.cookie('token', 'admin');
    next();
  }
  else {
    res.locals.verify = false;
    next();
  }
}
authController.verifyCookie = (req, res, next) => {
  if(req.cookie === {'token': 'admin'}){
    res.locals.verifyCookie = true;
    next();
  }
  res.locals.verifyCookie = false;
  next()

}


module.exports = authController;
