const db = require('../models/TaskModel');
const formData = require('express-form-data')

const authController = {};

authController.getUser = (req, res, next) => {
  const { username, password } = req.body;
  console.log('This is the req body, for getUser', req.body);
  const userQuery =
      `SELECT username FROM Task WHERE username = '${username}' AND password = '${password}'`;
  fetch(userQuery)
      .then(data => {
          console.log(data)
          if (data.rows[0]) {
              console.log("user has been verified")
              return next();
          } else {
              console.log('username/password are invalid');
              res.send("Invalid username or password, please sign up or try again");
          }
      })
      .catch(err => {
          return next(err);
      })
}
module.exports = authController;
