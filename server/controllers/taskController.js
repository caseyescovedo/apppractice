const db = require('../models/TaskModel');

const taskController = {};

taskController.getTasks = (req, res, next) => {
  const selectAll = `SELECT * FROM Task`;
  try {
    db.query(selectAll)
    .then(data => {
      res.locals.allTasks = data.rows;
      next();
    })
  } catch (err) {
    return next({
      log: `Error in taskController.getTasks`,
      message: { err: 'taskController.getTasks error' }
    })
  }
}

taskController.postTask = (req, res, next) => {
  let { item, created_at } = req.body;
  const insert = `INSERT INTO Task (item, created_at)
  VALUES ($1, $2)
  RETURNING *`
  const values = [item, created_at]
  try {
    db.query(insert, values)
    .then(data => {
      res.locals.newTask = data.rows[0];
      next();
    })
  } catch (err) {
    return next({
      log: `Error in taskController.postTask`,
      message: { err: 'taskController.postTask error' }
    })
  }
}

taskController.deleteTask = (req, res, next) => {
  let { _id } = req.query;
  const remove = `DELETE FROM Task
  WHERE _id=$1`
  const values = [_id]
  try {
    db.query(remove, values)
    .then(data => {
      next();
    })
  } catch (err) {
    return next({
      log: `Error in taskController.postTask`,
      message: { err: 'taskController.postTask error' }
    })
  }
}

module.exports = taskController;
