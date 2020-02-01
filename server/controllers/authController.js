const login = (req, res, next) => {
  //   console.log('request made it ');
  //   console.log(req.body);

  if (req.body.user == 'codesmith' && req.body.pass == 'ilovetesting') {
    res.cookie('token', 'admin');
    return res.redirect('/secret');
  } else {
    return res.send('unsuccessful login attempt');
  }
};

const authCheck = (req, res, next) => {
  // Check if the proper cookie exists

  if (req.cookies.token === 'admin') return next();
  else return res.send('You must be signed in to view this page');
};

module.exports = {
  login,
  authCheck
};
