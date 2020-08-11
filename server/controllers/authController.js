module.exports = {
  checkCookie: (req, res, next) => {
    if (!req.cookies.token || req.cookies.token !== 'admin') {
      res.string = 'You must be signed in to view this page';
      return next();
    }
    return next();
  },
  authUser: (req, res, next) => {
    const { user, pass } = req.body;
    if (user === 'codesmith' && pass === 'ilovetesting') {
      res.cookie('token', 'admin');
      res.successlogin = true;
      return next();
    } else {
      res.auth = 'unsucessful login attempt';
      return next();
    }
  },
};
