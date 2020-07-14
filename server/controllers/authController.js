const verifyAccount = (req, res, next) => {
  const { user, pass } = req.body;
  if (user === 'codesmith' && pass === 'ilovetesting') {
    next();
  } else {
    res.status(400).send('unsuccessful login attemp');
  }
};

const setCookie = (req, res, next) => {
  res.cookie('token', 'admin');
  next();
};

const verifyCookie = (req, res, next) => {
  if (req.cookies.token !== 'admin') {
    res.status(400).send('You must be signed in to view this page');
  } else {
    next();
  }
};

module.exports = {
  verifyAccount,
  setCookie,
  verifyCookie,
};
