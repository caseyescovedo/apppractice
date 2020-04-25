module.exports = {
  verifyUser: (req, res, next) => {
    const { user, pass } = req.body
    if(user === 'codesmith' && pass === 'ilovetesting') {
      res.cookie('token', 'admin', {
        maxAge: 360000,
        httpOnly: true,
      });
      return next()
    }
    else res.json('unsuccessful login attempt')
  },

  isLoggedIn: (req, res, next) => {
    const cookie = req.cookies.token;
    if(cookie === 'admin') return next()
    else res.json('You must be signed in to view this page')
  }
};
