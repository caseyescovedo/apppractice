module.exports = {
  verifyUser: (req, res, next) => {
    // I'm not sure how forms work so...this is my best attempt with 1 minute left!
    if (req.body.name === 'codesmith' && req.body.pass === 'ilovetesting') {
      return next();
    }
    res.locals.invalidUser = true;
    return next();
  },
  setCookie: (req, res, next) => {
    res.cookie('token', 'admin');
    return next();
  },
  checkCookie: (req, res, next) => {
    if (req.cookies && req.cookies.token && req.cookies.token === 'admin') {
      return next();
    }
    res.locals.notAuthenticated = true;
    return next();
  },
};
