const db = require('../models/TaskModel');

const taskController = {};

taskController.postTask = (req, res, next) => {
  //write query text
  const postQuery = 'INSERT INTO task (item) VALUES ($1)';
  //destrucutre task from body
  const { task } = req.body;
  //avoid SQL injection
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

//delete the task
taskController.deleteTask = (req, res, next) => {
  //write query text
  const deleteQuery = 'DELETE FROM task WHERE id=($1)';
  //destructure value from req.body
  const { task } = req.body;
  //avoid SQL injection
  const queryObj = {
    text: deleteQuery,
    values: [task]
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
