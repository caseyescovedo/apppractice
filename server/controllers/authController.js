const authController = {};

authController.signin = (req, res, next) => {
  console.log(req.body);
  let { user, pass } = req.body;
  if (user !== 'codesmith' || pass !== 'ilovetesting') {
    res.cookie('token', '403');
    return res.status(403).send('unsuccessful login attempt');
  }
  res.cookie('token', 'admin');
  next();
}

authController.isLoggedIn = (req, res, next) => {
  if (req.cookies.token !== 'admin') {
    return res.status(401).send('You must be signed in to view this page');
  }
  next();
}

module.exports = authController;