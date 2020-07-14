module.exports = {
  authenticate: (req, res, next) => {
    if (req.body.user === 'codesmith' && req.body.pass === 'ilovetesting') {
      return next();
    } else {
      res.send('unsuccessful login attempt');
    }
  },

  setCookie: (req, res, next) => {
    res.cookie('token', 'admin');
    return next();
  },

  checkCookie: (req, res, next) => {
    console.log('cookies ->', req.cookies);
    if (req.cookies.token === undefined || req.cookies.token !== 'admin') {
      res.send('You must be signed in to view this page');
    } else {
      return next();
    }
  },
};
