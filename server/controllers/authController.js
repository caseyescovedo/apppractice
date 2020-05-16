const path = require('path');
module.exports = {
  authenticate: (req, res, next) => {
    // Check the username and password, if they match:
    if (req.body.user === 'codesmith' && req.body.pass === 'ilovetesting') {
      // Add the cookie and redirect
      res.cookie('token', 'admin');
      res.redirect('/secret');
      // else, send string
    } else {
      res.status(403).send('unsuccessful login attempt');
    }
  },
  authorize: (req, res, next) => {
    // Check for correct cookie
    if (req.cookies.token === 'admin'){
      // if cookie is there, redirect to secret
      res.sendfile(path.join(__dirname, '../../views/secret.html'));
    } else {
      res.send('You must be signed in to view this page');
    }
  },
};
