const db = require('../models/TaskModel')

const taskController = {};

taskController.postTask = (req, res, next) => {
  const { item, created_at } = req.body;
  const values = [item, created_at];
  const postQuery = `INSERT INTO task (item, created_at)
  VALUES ($1, $2) RETURNING *`
  db.query(postQuery, values)
    .then((data) => {
      res.locals.post = data.rows[0];
      return next();
    })
    .catch((err) => {
      console.log('post a task', err);
      return next();
    })
}

taskController.getTasks = (req, res, next) => {
  // console.log('in task controller')
  const getQuery = `SELECT * FROM task`
  db.query(getQuery)
    .then((data) => {
      res.locals.data = data.rows;
      return next();
    })
    .catch((err) => {
      console.log('get tasks', err);
      return next();
    })
}

taskController.deleteTask = (req, res, next) => {
  const { _id } = req.body;
  const values = [_id]
  const deleteQuery = `DELETE FROM task WHERE _id = $1 RETURNING *`
  db.query(deleteQuery, values)
    .then((data) => {
      res.locals.delete = data.rows[0];
      return next();
    })
    .catch((err) => {
      console.log('delete task', err);
      return next();
    })
}

module.exports = taskController;
