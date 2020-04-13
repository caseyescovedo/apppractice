const verifyUser = (req, res, next) => {
  const { user, pass } = req.body;

  if (user === 'codesmith' && pass === 'ilovetesting') {
    next();
  } else {
    //   if user and password didn't match, just throw an error message immediately
    return res.status(401).send('unsuccessful login attempt');
  }
};

const setCookie = (req, res, next) => {
  res.cookie('token', 'admin');
  next();
};

const verifyCookie = (req, res, next) => {
  if (req.cookies.token === 'admin') {
    next();
  } else {
    return res.status(401).send('You must be signed in to view this page');
  }
};

module.exports = { verifyUser, setCookie, verifyCookie };
