const db = require('../models/TaskModel');

const taskController = {};

taskController.postTask = (req, res, next) => {
  const queryString = 'INSERT INTO Tasks (item) VALUES ($1);';
  const { task } = req.body;
  const queryArr = [task];

  db.query(queryString, queryArr)
    .then(() => {
      next();
    })
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
  const queryString = 'DELETE FROM Tasks WHERE message_id = ($1)';
  const { id } = req.body;
  const queryArr = [id];

  db.query(queryString, queryArr)
    .then(() => {
      next();
    })
    .catch((error) => {
      console.log('Error in deleteTask Middleware: ', error);
      next(error);
    });
};

module.exports = taskController;
