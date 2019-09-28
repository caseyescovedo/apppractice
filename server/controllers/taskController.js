const pool = require('../models/TaskModel');

// get tasks
const getTasks = (req, res, next) => {
  const query = 'SELECT * FROM "Task" ORDER BY _id';

  pool.query(query, (err, tasks) => {
    if (err) {
      return next(err);
    } else {
      res.locals.tasks = tasks.rows;
      return next();
    }
  });
};

// post task
const postTask = (req, res, next) => {
  const query =
    'INSERT INTO "Task" (item, created_at) VALUES ($1, CURRENT_TIMESTAMP)';
  const arr = [req.body.item];

  pool.query(query, arr, err => {
    if (err) {
      return next(err);
    } else {
      return next();
    }
  });
};

// delete task
const deleteTask = (req, res, next) => {
  const taskId = req.params.id;

  pool.query('DELETE FROM "Task" WHERE _id = ($1)', [taskId], err => {
    if (err) {
      return next(err);
    } else {
      return next();
    }
  });
};

module.exports = {
  getTasks,
  postTask,
  deleteTask
};
