module.exports = {
  signIn(req, res, next) {
    const { user, pass } = req.body;
    if (user === 'codesmith' && pass === 'ilovetesting') {
      next();
    } else {
      res.status(401).send('unsuccessful login attempt');
    }
  },

  setCookie(req, res, next) {
    res.cookie('token', 'admin', {httpOnly: true})
    next()
  },

  checkCookies(req, res, next) {
    if (req.cookies.token === 'admin') {
      next()
    } else {
      res.status(401).send('You must be signed in to view this page')
    }
  }
};
