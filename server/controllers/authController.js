// Checking user and password
const check = (req, res, next) => {
  const { user, pass } = req.body;
  if (user === 'codesmith' && pass === 'ilovetesting') {
    res.locals.auth = true;
  }
  next();
};

// Setting cookie
const setCookie = (req, res, next) => {
  if (res.locals.auth) res.cookie('token', 'admin');
  next();
}

// Checking for a cookie
const checkCookie = (req, res, next) => {
  if (req.cookies.token === 'admin') 
    res.locals.cookies = true;
  next();
}

module.exports = { check, setCookie, checkCookie };
