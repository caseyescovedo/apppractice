module.exports = {
  verifyLogin: (req, res, next) => {
    const { user, pass } = req.body;
    if (user === 'codesmith' && pass === 'ilovetesting') {
      res.locals = { user, pass };
      next();
    } else {
      res.send('unsuccessful login attempt');
    }
  },
  setCookie: (req, res, next) => {
    console.log('res.locals in setCookie: ', res.locals);
    res.cookie('token', 'admin');
    next();
  },
  verifyCookie: (req, res, next) => {
    if (req.cookies.token === 'admin') {
      next();
    } else {
      res.send('You must be signed in to view this page');
    }
  },
};
