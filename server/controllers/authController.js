module.exports = {

  verifyUser: (req, res, next) => {
    if (req.body.user === 'codesmith' && req.body.pass === 'ilovetesting') {
      return next();
    }
    return res.status(403).send('unsuccessful login attempt');
  },

  setAdminCookie: (req, res, next) => {
    res.cookie('token', 'admin', {httpOnly: true});
    return next();
  },

  verifyAdminCookie: (req, res, next) => {
    if (req.cookies.token === 'admin') return next();
    return res.status(403).send('You must be signed in to view this page');
  }

};
