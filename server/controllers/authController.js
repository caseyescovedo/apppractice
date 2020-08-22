const db = require('../models/TaskModel');

const authController = {};

authController.setCookie = (req, res, next) => {
  const { userid } = res.locals.user;
  res.cookie('userid', userid, { httpOnly: true });
  return next();
};

authController.checkCookie = (req, res, next) => {
  if (req.cookies.userid) {
    return next();
  }
  res.redirect('/');
};

authController.verify = (req, res, next) => {
  const { username, password } = req.body;
  const text = [username];
  const query = 'SELECT * FROM users WHERE username = $1';
  db.query(query, text)
    .then((data) => {
      if (data.rows[0].password === password) {
        res.locals.user = data.rows[0];
        return next();
      }
      res.status(404).send('unsuccessful login attempt');
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = authController;
