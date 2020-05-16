/* eslint-disable no-else-return */
const path = require('path');
// user of codesmith
// pass of ilovetesting
// set cookie on client
// key of token, value of admin

module.exports = {
  verifyUser(req, res, next) {
    // login will send GET request to secret with user and password in query
    console.log(req.body, req.get('cookie'));
    if (Object.entries(req.body).length === 0) {
      return res.status(404).send('unsuccessful login attempt');
    }
    if (req.body.user === 'codesmith' && req.body.pass === 'ilovetesting') {
      // if correct user and pass
      res.cookie('token', 'admin', { maxAge: 900000, httpOnly: true });
      return next();
    }
    return res.status(404).send('unsuccessful login attempt');
  },
  verifySecret(req, res) {
    console.log(req.query, req.get('cookie'));
    if (Object.entries(req.query).length === 0 && !req.get('cookie')) {
      // if no query and no cookie
      return res.status(404).send('You must be signed in to view this page');
    }
    if (req.get('cookie')) {
      // if they were not redirect from get request from login's form
      const cookieString = req.get('cookie');
      if (!cookieString) {
        // if no cookie
        return res.status(404).send('You must be signed in to view this page');
      }
      const cookieArr = cookieString.split('=');
      if (cookieArr[0] !== 'token' && cookieArr[1] !== 'admin') {
        // if invalid cookie
        return res.status(404).send('You must be signed in to view this page');
      }
      // valid cookie
      return res
        .status(200)
        .sendFile(path.resolve(__dirname, '../../views/secret.html'));
    }
    return res.status(404).send('You must be signed in to view this page');
  },
};
/*if (req.query.user === 'codesmith' && req.query.pass === 'ilovetesting') {
      // if redirected from get request from login's form
      // set cookie on client
      res.cookie('token', 'admin', { maxAge: 900000, httpOnly: true });
      return res
        .status(200)
        .sendFile(path.resolve(__dirname, '../../views/secret.html'));
    } else  */
