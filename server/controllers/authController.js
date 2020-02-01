module.exports = {
  authenticateUser: (req, res, next) => {
    const validUser = 'codesmith';
    const validPass = 'ilovetesting';
    const { user, pass } = req.body;

    if (user === validUser && pass === validPass) {
      return next();
    }
    // Shortcircuit middleware chain if invalid credentials
    return res.send('unsuccessful login attempt');
  },

  setCookie: (req, res, next) => {
    res.cookie('token', 'admin');
    return next();
  },

  checkCookie: (req, res, next) => {
    const { cookies } = req;
    if (cookies.token === 'admin') return next();
    // Shortcircuit middleware chain if user not authenticated
    return res.send('You must be signed in to view this page');
  },
};
