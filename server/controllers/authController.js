module.exports = {
  authenticate: (req, res, next) => {
    const { user, pass } = req.body;
    if(user !== 'codesmith' || pass !== 'ilovetesting') {
      return res.status(401).send('unsuccessful login attempt');
    }
    return next();
  },
  setCookie: (req, res, next) => {
    res.cookie('token', 'admin');
    return next();
  },
  checkCookie: (req, res, next) => {
    const { token } = req.cookies;
    if(token !== 'admin') return res.status(403).send('You must be signed in to view this page');
    return next();
  }

};
