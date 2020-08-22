module.exports = {
  verifyUser: (req, res, next) => {
    console.log('VerifyUser req.body ', req.body);
    const { user, pass } = req.body;

    if (user !== 'codesmith' || pass !== 'ilovetesting') {
      return res.send('unsuccessful login attempt');
    }

    return next();
  },

  setCookie: (req, res, next) => {
    res.cookie('token', 'admin');
    return next();
  },

  isLoggedIn: (req, res, next) => {
    const { token } = req.cookies;
    console.log('isLoggedIn token', token);

    if (token !== 'admin') {
      return res.send('You must be signed in to view this page');
    }

    return next();
  },
};
