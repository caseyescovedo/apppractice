const authController = {};

const adminUser = "codesmith";
const adminPass = "ilovetesting"
authController.checkCred = (req, res, next) => {
  if (req.body.user === adminUser && req.body.pass === adminPass){
    res.locals.pass = true;
    next();
  }
  else if (req.cookies.token === 'admin') { //this allows for a refresh on the signin page to not kick you out
    console.log('already authorized')
    res.locals.pass = true;
    next();
  }
  else {
    res.locals.pass = false;
    next();
  }
}

module.exports =  authController;