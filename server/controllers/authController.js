module.exports = {

  verfiyCredentials: function(req, res, next) {
    // const signin = document.getElementById(signin);
    // console.log('signin: ', signin);
    res.cookie('token', 'admin');
    return next();
  },

  verifyCookies: function(req, res, next) {
    // console.log('cookie: ', req.cookies);
    if (req.cookies.token === 'admin') return next();
    console.log('You must be signed in to view this page');
    return next({
      message: { err: 'You must be signed in to view this page' },
    });
  },

};
