const db = require('../models/TaskModel');

const taskController = {};

taskController.postTask = (req, res, next) => {
  const postQuery = 'INSERT INTO task (item) VALUES ($1)';
  const task = req.body;
  const queryObj = {
    text: postQuery,
    values: [task]
  };
  db.query(queryObj)
    .then(data => {
      return next();
    })
    .catch(err => {
      return next(err);
    })
};

taskController.getTasks = (req, res, next) => {
  db.query('SELECT * FROM task')
    .then(data => {
      res.locals.tasks = data.rows;
      return next();
    })
    .catch(err => {
      return next(err);
    })
};

taskController.deleteTask = (req, res, next) => {
  const deleteQuery = 'DELETE FROM task WHERE id=($1)';
  const id = req.body;
  const queryObj = {
    text: deleteQuery,
    values: [id]
  }
  db.query(queryObj)
    .then(data => {
      return next();
    })
    .catch(err => {
      return next(err);
    })
};

module.exports = taskController;
