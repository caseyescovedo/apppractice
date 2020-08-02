const db = require('../models/TaskModel.js');

const authController = {};

authController.login = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  const sqlReq = 'SELECT * FROM users WHERE username=$1';
  const values = [username];
  db.query(sqlReq, values)
    .then((data) => {
      if (data.rows[0].password === password) {
        res.locals.user = username;
        return next();
      } else {
        res.send(`unsuccessful login attempt`);
      }
    })
    .catch((err) => next(err));
};

authController.sendCookies = (req, res, next) => {
  res.cookie('token', 'admin', {
    maxAge: 5000,
    httpOnly: true,
  });
  next();
};

//TODO
// authController.checkCookies = (req, res, next) => {
//   const incoming = req.cookie;
//   console.log('incoming', incoming);
//   if (req.cookie.token === 'admin') {
//     return next();
//   } else {
//     res.send(`You must be signed in to view this page`);
//   }
// };

module.exports = authController;
