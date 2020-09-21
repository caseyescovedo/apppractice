const path = require('path');

module.exports = {
  authUser: function(req, res, next) {
    // Destructure username and password from request body
    const { user, pass } = req.body;
    // checks if request body is valid
    const credentials = {username: 'codesmith', password: 'ilovetesting'};
    if (user === credentials.username && pass === credentials.password) {
      // Set cookies
      res.cookie('token', 'admin');
      return next();
    } else {
      // Send following message
      res.send('unsuccessful login attempt');
    }
  },
  checkCookie: function(req, res, next) {
    // Check for cookies
    if (req.cookies && req.cookies['token'] === 'admin') return next();
    else {
      res.send('You must be signed in to view this page');
    }
  }
};
