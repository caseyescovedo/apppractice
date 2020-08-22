const path = require('path');

module.exports = {
  cookieCheck(req, res) {
    if (req.cookies.token === 'admin') return res.sendFile(path.resolve(__dirname, '../views/secret.html'));
    return res.send('You must be signed in to view this page');
  },

  verifyUser(req, res) {
    if (req.body.user === 'codesmith' && req.body.password === 'ilovetesting') {
      res.cookie('token', 'admin');
      return res.redirect('../secret');
    }
    return res.status(403).send('unsuccessful login attempt');
  },

};
