const db = require('../models/TaskModel');

const taskController = {};

taskController.getTasks = (req, res, next) => {
  const text = 'SELECT * FROM Task'
  db.query(text, (err, results) => {
    if (err) return next(err);
    // console.log('results from taskController', results.rows);
    res.locals.items = results.rows;
    next();
  });
};

taskController.postTask = (req, res, next) => {
  const text = 'INSERT INTO Task (item) VALUES ($1)';
  const values = [req.body.newItem];
  db.query(text, values, (err, results) => {
    if (err) return next(err);
    res.locals.items = req.body.newItem;
    next();
  })
};

taskController.deleteTask = (req, res, next) => {
  const text = 'DELETE FROM Task WHERE _id = $1';
  const values = [req.body.taskId];
  db.query(text, values, (err, results) => {
    if (err) return next(err);
    res.locals.taskId = req.body.taskId;
    next();
  })
};

module.exports = taskController;
