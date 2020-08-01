module.exports = {
  setCookie: (req, res, next) => {
    res.cookie('token', 'admin');
    return next();
  },

  checkCookie: (req, res, next) => {
    if (req.cookies.token === 'admin') return next();
    else {
      res.status(401).send('You must be signed in to view this page');
    }
  },

  checkAuth: (req, res, next) => {
    const { user, pass } = req.body;
    if (user === 'codesmith' && pass === 'ilovetesting') return next();
    else {
      res.send('unsuccessful login attempt');
      return next({ err: 'incorrect credentials provided!' });
    }
  },
};
