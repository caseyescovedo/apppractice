const db = require('../models/taskModel.js');
// const { query } = require('../models/taskModel.js');

const taskController = {};

taskController.getTasks = (req, res, next) => {
  const queryStr = `SELECT * FROM tasks;`;
  db.query(queryStr)
    .then((data) => {
      res.locals.tasks = data.rows;
      return next();
    })
    .catch((err) => next(err));
};

taskController.postTask = (req, res, next) => {
  const { item } = req.body;
  if (!item) return next('Item can not be empty');
  console.log(req.body);
  const queryStr = `INSERT INTO tasks VALUES(DEFAULT, '${item}', NOW()) RETURNING *;`;
  db.query(queryStr)
    .then((data) => {
      res.locals.newTask = data.rows[0];
      return next();
    })
    .catch((err) => next(err));
};

taskController.deleteTasks = (req, res, next) => {
  const _id = req.params._id;
  if (!_id) return next('Failed to find item');
  const queryStr = `DELETE FROM tasks WHERE _id=${_id}`;
  db.query(queryStr)
    .then(() => next())
    .catch((err) => next(err));
};

module.exports = taskController;
