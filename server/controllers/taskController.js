const db = require('../models/TaskModel');

const taskController = {};

taskController.postTask = (req, res, next) => {
  const queryString = '';

  db.require()
    .next()
    .catch((error) => {
      console.log('Error in postTask Middleware: ', error);
      next(error)
    });
};

taskController.getTask = (req, res, next) => {
  const queryString = '';

  db.require()
    .then((response) => {
      next()
    })
    .catch((error) => {
      console.log('Error in getTask Middleware: ', error);
      next(error);
    })
};

taskController.deleteTask = (req, res, next) => {
  const queryString = '';

  db.require()
    .then((response) => {
      next();
    })
    .catch((error) => {
      console.log('Error in deleteTask Middleware: ', error);
      next(error);
    })
};

module.exports = taskController;
