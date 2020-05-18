module.exports = {
  //verify user name and password
  authenticate: (req, res, next) => {
    const { user, pass } = req.body;

    //if invalid, send an error
    if (user !== 'codesmith' || pass !== 'ilovetesting') {
      return res.status(403).send('unsuccessful login attempt');
    }

    //if valid, set a cookie
    res.cookie('token', 'admin');
    return next();
  },
  //check to see if a client has been authenticated
  verify: (req, res, next) => {
    const { token } = req.cookies;

    //if the cookie does not exist or is invalid, send an error
    if (token !== 'admin') {
      return res.status(401).send('You must be signed in to view this page');
    }

    return next();
  }
};
