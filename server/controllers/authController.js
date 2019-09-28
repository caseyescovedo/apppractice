// sign in
const signIn = (req, res, next) => {
  if (req.body.user === 'codesmith' && req.body.pass === 'ilovetesting') {
    return next();
  }

  return res.send('unsuccessful login attempt');
};

// add cookie
const addCookie = (req, res, next) => {
  res.cookie('token', 'admin', { httpOnly: true });
  return next();
};

// verify cookie
const verifyCookie = (req, res, next) => {
  if (req.cookies.token === 'admin') {
    return next();
  }

  return res.send('You must be signed in to view this page');
};

module.exports = {
  signIn,
  addCookie,
  verifyCookie
};
