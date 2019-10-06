const username = 'codesmith';
const password = 'ilovetesting';

const verifyUser = (req, res, next) => {
  const { user, pass } = req.body;
  if (user === username || pass === password) {
    res.redirect('/secret')
  }
  next()
}

const setCookie = (req, res, next) => {
  res.cookie('token', 'admin')
  next()
}

const verifyCookie = (req, res, next) => {
  if (!req.cookies.token) {
    return res.json('You must be signed in to view this page')
  } else {
    next();
  }
}

module.exports = {
  verifyUser,
  setCookie,
  verifyCookie
};

// - [ ] Visiting the `http://localhost:3333/secret` route directly should now check for the valid cookie before sending the secret page. If the cookie is not valid (or does not exist), send back the string `You must be signed in to view this page`
