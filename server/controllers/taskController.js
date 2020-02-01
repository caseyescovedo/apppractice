const db = require('../models/TaskModel');

const taskController = {};

taskController.postTask = (req, res, next) => {
  const queryString = '';

  db.query()
    .next()
    .catch((error) => {
      console.log('Error in postTask Middleware: ', error);
      next(error);
    });
};

taskController.getTask = (req, res, next) => {
  const queryString = 'SELECT * FROM Tasks';

    db.query(queryString)
    .then((response) => {
      res.locals.tasks = response.rows;
      next();
    })
    .catch((error) => {
      console.log('Error in getTask Middleware: ', error);
      next(error);
    });
};

taskController.deleteTask = (req, res, next) => {
  const queryString = '';

  db.query()
    .then((response) => {
      next();
    })
    .catch((error) => {
      console.log('Error in deleteTask Middleware: ', error);
      next(error);
    });
};

module.exports = taskController;
