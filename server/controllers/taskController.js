const pool = require('../models/TaskModel');

const postTask = (req, res, next) => {
  const { task } = req.body;
  console.log('task inside postTask middleware', task);
  const queryPostTask = `INSERT INTO "tasks" ("task") VALUES ($1)`;
  pool.query(queryPostTask, [task], (err, results) => {
    if (err) {
      next(err);
    }
    next();
  })
}

const getTasks = (req, res, next) => {
  const queryGetTasks = `SELECT * FROM "Tasks"`;
  pool.query(`SELECT * FROM "tasks"`, (err, results) => { // has to be lowercase tasks...HNNNGGGGG
    if (err) {
      next(err);
    }
    console.log('results', results);
    res.locals.tasks = results.rows;
    next();
  })
}

const deleteTask = (req, res, next) => {
  const id = parseInt(req.params.id);

  pool.query('DELETE FROM foods WHERE id = $1', [id], (err, results) => {
    if (err) {
      throw err;
    }
    next();
  })
}

module.exports = {
  postTask,
  getTasks,
  deleteTask
};
