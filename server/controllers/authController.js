const db = require('../models/TaskModel');
const authController = {};

authController.signIn = (req, res, next) => {
  const { username, password } = req.body;
  const signInEntries = `INSERT INTO user (name, password) VALUES ('${username}', '${password}') RETURNING *`;
  db.query(signInEntries)
    .then((data) => {
      res.locals.user = data.rows[0];
      console.log('res locals user', res.locals.user);
      return next();
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

module.exports = authController;
