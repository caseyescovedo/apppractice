module.exports = {
  
  authorizeUser(req, res, next) {
    const { user, pass } = req.body;
    if (user === 'codesmith' && pass === 'ilovetesting') {
      res.cookie('token', 'admin');
      return next();
    }
    return next('Unsuccessful login attempt');
  },

  checkCookie(req, res, next) {
    return req.cookies.token === 'admin' ? next() : next('You must be signed in to view this page');
  },
};
