// user table is stored in the same db as task table
const db = require('../models/TaskModel');

module.exports = {

  // verify user. passwords are stored as PLAIN TEXT in db <-- BAD
  verifyUser: function(req, res, next) {
    console.log('req cookie ', req.cookies);
    const { user, pass } = req.body;
    if (!user || !pass) return next();
    const query = `SELECT * FROM users WHERE username=$1`
    const values = [user];
    db.query(query, values, (err, foundUser) => {
      if (err) return next({ location: 'verifyUser', log: err });
      // if user not found in db
      if (foundUser.rows.length === 0) return next();
      // if supplied password doesnt match db password
      if (foundUser.rows[0].password !== pass) return next();
      // if everything matches, store data
      res.locals.data = foundUser.rows[0];
      return next();
    });
  },

  // check for cookie or set cookie
  setCookie: function(req, res, next) {
    console.log('in set cookie');
    console.log('req cookie ', req.cookies);
    if (!res.locals.data) return next();
    res.cookie('token', 'admin')
    return next();
  },

  // check for cookie, pass boolean along
  checkCookie: function(req, res, next) {
    const { token } = req.cookies;
    if (!token || token !== 'admin') {
      res.locals.cookie = false;
      return next();
    }
    res.locals.cookie = true;
    return next();
  }
};
