const db = require('../models/TaskModel.js');

const taskController = {};

taskController.postTask = (req, res, next) => {
  const { item } = req.body;
  const valuesArr = [item];
  const queryString = 'INSERT INTO Task (item) VALUES ($1)'
  db.query(queryString, valuesArr, (err, response) => {
    if (err) return next({
      log: 'express error handler caught error in postTask middleware',
      status: 400,
      message: { err },
    })
    return next();
  })
};

taskController.getTasks = (req, res, next) => {
  const queryString = 'SELECT * FROM Task';
  db.query(queryString, (err, response) => {
    if (err) return next({
      log: 'express error handler caught error in postTask middleware',
      status: 400,
      message: { err },
    })
    res.locals.allTasks = response.rows;
    return next();
  })
};

taskController.deleteTask = (req, res, next) => {
  const { id } = req.body;
  const valuesArr = [id];
  const queryString = 'DELETE FROM Task WHERE id=$1';
  db.query(queryString, valuesArr, (err, response) => {
    if (err) return next({
      log: 'express error handler caught error in postTask middleware',
      status: 400,
      message: { err },
    })
    return next();
  })
};

module.exports = taskController;
