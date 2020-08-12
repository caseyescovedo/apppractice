const db = require("../models/TaskModel");

const taskController = {};

taskController.getTasks = (req, res, next) => {
  const queryAll = 'SELECT * FROM tasks';
  db.query(queryAll)
  .then((response) => {
    res.locals.messages = result.rows;
    return next();
  })
  .catch(error => next({ log: error}));
}

taskController.postTask = (req, res, next) => {
  const task = req.body.tasks;
  const queryAdd = `INSERT INTO tasks(item) VALUES ($1);`
  db.query(queryAdd, [task])
  .then((result) => next())
  .catch(error => { console.log(error)
    next({ log: error })})
}

taskController.deleteTask = (req, res, next) => {
  const queryDelete = `DELETE FROM tasks WHERE task_id = $1;`;
  db.query(queryDelete, [req.params.id])
    .then((response) => next())
    .catch(error => next({ log: error }))
}


module.exports = taskController;