module.exports = {
  verifySignin: (req, res) => {
    if (req.body.user === 'codesmith' && req.body.pass === 'ilovetesting') {
      res.cookie('token', 'admin');
      return res.status(200).redirect('/secret');
    } else {
      return res.status(401).send('unsuccessful login attempt');
    }
  },

  checkCookies: (req, res, next) => {
    if (req.cookies['token'] === 'admin') res.locals.goodCookie = true;
    else res.locals.goodCookie = false;
    return next();
  },
};
