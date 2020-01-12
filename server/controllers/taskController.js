const db = require('../models/TaskModel');
// const formData = require('express-form-data')

const taskController = {};

taskController.getTask = (req, res, next) => {
  const { item } = req.body;
  console.log('This is the req body, for getTask', req.body);
  const userQuery =
      `SELECT item FROM Task WHERE username = '${username}' AND password = '${password}'`;
  fetch(userQuery)
      .then(data => {
          console.log(data)
          if (data.rows[0]) {
              console.log("here is your item")
              return next();
          }
      })
      .catch(err => {
          return next(err);
      })
}

taskController.deleteTask = (req, res, next) => {
  
}

taskController.postTask = (req, res, next) => {

}

module.exports = taskController;