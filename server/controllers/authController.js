module.exports = {
  checkUserPass: (req, res, next) => {
    const { user, pass } = req.body;
    if(user === 'codesmith' && pass === 'ilovetesting') {
      res.cookie('token', 'admin');
      return next();
    }
    res.send('unsuccessful login attempt');
  },
  checkCookie: (req, res, next) => {
    const { token } = req.cookies;
    if(token === 'admin') {
      return next();
    }
    res.send('You must be signed in to view this page');
  } 

};
