module.exports = {

  logIn: (req, res, next) => {
    const { user, pass } = req.body;
    if (user === 'codesmith' && pass === 'ilovetesting') {
      res.cookie('token', 'admin');
      return res.redirect('/secret');
    }
  },

  checkCookie: (req, res, next) => {
    if (req.cookies.token === 'admin') {
      return next();
    }
    return res.send('You must be signed in to view this page');
  },

};
