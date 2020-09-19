module.exports = {

  authenticate: (req, res, next) => {
    // req body will contain username and password
    const {user, pass} = req.body;

    //if username and password is correct then res.locals.sucess is set to true and a cookie is created.

    if(user === 'codesmith' && pass === 'ilovetesting') {
      res.locals.success = true;
      res.cookie('token', 'admin');
    } else {
      res.locals.sucess = false;
    }
    return next();
  },

  checkCookie: (req, res, next) => {
    if(req.cookies.token === 'admin') {
      return next()
    } else {
      res.redirect('/');
    }
  }

};
