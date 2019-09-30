module.exports = {
  signIn: (req, res, next) => {
    const { user, pass } = req.body;
    // check for inputs from client-side
    if (user !== 'codesmith' || pass !== 'ilovetesting') return res.send('unsuccessful login attempt');
    // set cookie
    res.cookie('token', 'admin');
    return next();
  },
  protect: (req, res, next) => {
    if (req.cookies.token !== 'admin') return res.send('You must be signed in to view this page');
    return next();
  }
};
