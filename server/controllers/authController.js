const { cookie } = require('request');

module.exports = {
  getCookie: async (req, res, next) => {
    if (req.cookies.token !== 'admin') {
      res.json('You must be signed in to view this page');
    } else {
      next();
    }
  },
  setCookie: async (req, res, next) => {
    if (req.body.user === 'codesmith' && req.body.pass === 'ilovetesting') {
      res.cookie('token', 'admin');
      res.redirect('/secret');
    } else {
      res.json('unsuccessful login attempt');
    }
  },
};
