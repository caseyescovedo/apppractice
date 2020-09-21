const db = require('../models/taskModel');

const taskController = {};

taskController.postTask = (req, res, next) => {
  console.log('here');
  const query = `INSERT into task (item, created_at) VALUES ($1, $2) RETURNING *`;
  const values = [req.body.item, new Date()];
  db.query(query, values)
    .then((data) => (res.locals.postedTask = data.rows[0]))
    .then(() => next())
    .catch((err) => next(err));
};

// get all tasks from database
taskController.getTasks = (req, res, next) => {
  // declare query string
  const query = `SELECT * from task`;
  db.query(query)
    .then((data) => (res.locals.allTasks = data.rows))
    .then(() => next())
    .catch((err) => next(err));
};

taskController.deleteTask = (req, res, next) => {
  const query = `DELETE from task WHERE id = $1 RETURNING *;`;
  values = [req.body.id];
  db.query(query, values)
    .then((data) => (res.locals.deletedTask = data.rows[0]))
    .then(() => next())
    .catch((err) => next(err));
};
module.exports = taskController;
