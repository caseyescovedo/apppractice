const pool = require('../models/TaskModel')

const taskController = {};


taskController.postTask = (req, res, next) => {

  const { item } = req.body;

  pool.query(`INSERT INTO tasks (item) VALUES ('${item}') RETURNING *`, (err, results) => {
    if (err) {
      console.error(err);
      next('postTask Error');
    }
    res.locals.task = results.rows[0]
    next();
  })

}

taskController.getTasks = (req, res, next) => {

  pool.query('SELECT * FROM tasks', (err, results) => {
    if (err) {
      console.error(err);
      next('getTask Error');
    }
    res.locals.tasks = results.rows
    next();
  })
}

taskController.deleteTask = (req, res, next) => {

  const { _id } = req.body;

  pool.query(`DELETE FROM tasks WHERE tasks._id=${_id}`, (err, results) => {
    if (err) {
      next('deleteTask Error');
    }
    next();
  })
}




module.exports = taskController;
