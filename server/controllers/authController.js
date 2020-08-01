module.exports = {
  validate: (req, res, next) => {
    const { user, pass } = req.body;
    if (user === 'codesmith' && pass === 'ilovetesting') {
      res.cookie('token', 'admin', {
        maxAge: 360000,
        httpOnly: true,
      });
      res.redirect('/secret');
    } else {
      res.send('unsucessful login attempt');
    }
  },

  checkCookie: (req, res, next) => {
    if (req.cookies.token !== 'admin')
      res.send('You must be signed in to view this page');
    else return next();
  },
};
