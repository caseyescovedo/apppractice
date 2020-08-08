module.exports = {
  checkCreds: (req, res, next) => {
    const user = req.body.user;
    const pass = req.body.pass;
    if (user !== 'codesmith' || pass !== 'ilovetesting') return next('unsuccessful login attempt');
    else return next();
  },
  setCookie: (req, res, next) => {
    res.cookie("token", "admin");
    return next();
  },
  checkCookie: (req, res, next) => {
    console.log('COOKIE ', req.cookies);
    const key = Object.keys(req.cookies)[0];
    const val = Object.values(req.cookies)[0];
    // const {key, val} = req.cookies;
    if (key !== 'token' || val !== 'admin') return next('You must be signed in to view this page');
    else return next();
  }
};