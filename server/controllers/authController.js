const db = require('../models/TaskModel');
const authController = {};


authController.setCookie = (req, res, next) => {
  console.log('in cookie controller');
  res.cookie('mystery', Math.floor(999 * (Math.random())));
  next();
}

authController.createUser = (req, res, next) => {
  console.log('in createUser');
  let { user, pass } = req.body;
  console.log('req.body in createUser', req.body);
  // let user = newuser;
  console.log(user);
  // let pass = newpass;
  // let mystery = Math.floor(999 * (Math.random()));
  res.cookie('user', user, {httpOnly:true});

  values = [user, pass];
  sqlString = `insert into users
                ("user", pass)
                values($1, $2)
                returning *
                ;`;
  db.query(sqlString, values)
  .then(data => {
    console.log('res.locals.rows: ',data.rows);
    res.locals.user = data.rows;

    next();
  })
  .catch(err => next(err));
}

authController.verifyUser = (req, res, next) => {
  console.log('in verifyUser');
  let { user, pass } = req.body;

  values = [user, pass];
  sqlString = `select "user"
                from users
                where "user" like $1
                and
                pass like $2
                ;`;

  db.query(sqlString, values)
  .then(data => {
    console.log('res.locals.rows: ',data.rows);
    res.locals.user = data.rows;

    next();
  })
  .catch(err => next(err));
}

module.exports = authController;
