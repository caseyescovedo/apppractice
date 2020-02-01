const db = require('../models/TaskModel');

const taskController = {};

taskController.postTask = (req, res, next) => {
  const { item } = req.body;
  const params = [item];
  const queryString = 'INSERT INTO tasks (item) VALUES ($1)';
  db.query(queryString, params, (err, response) => {
    if (err) console.log(err);
    if (!err) res.locals.newItem = response;
    return next();
  });
};

taskController.getTask = (req, res, next) => {
  const queryString = 'SELECT * FROM tasks';
  db.query(queryString, null, (err, response) => {
    if (err) console.log(err);
    if (!err) res.locals.tasks = response;
    return next();
  });
};

taskController.deleteTask = (req, res, next) => {
  const { id } = req.body;
  const params = [id];
  const queryString = 'DELETE FROM tasks WHERE id = $1';
  db.query(queryString, params, (err, response) => {
    if (err) console.log(err);
    if (!err) res.locals.deletedItem = response;
    return next();
  });
  return next();
};

module.exports = taskController;
