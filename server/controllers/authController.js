const authController = {};

//determine if credentials passed form form match admin credentials
authController.checkCredentials = (req, res, next) => {
  const {user, pass} = req.body;

  //if credentials don't match initialize an error on res.locals
  if(user !== 'codesmith' || pass !== 'ilovetesting'){
    res.locals.error = 'unsucessful login attempt';
  }

  return next();
}

authController.setCookie = (req, res, next) => {
  //if there is no error on res.locals set a cookie
  if(!res.locals.error){
    res.cookie('token', 'admin');
  }
  
  return next();
};

module.exports = authController;
