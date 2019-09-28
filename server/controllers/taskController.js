const pool = require('../models/TaskModel');

const createTable = (req, res, next) => {
  const table = "CREATE TABLE IF NOT EXISTS Tasks (_id SERIAL PRIMARY KEY, item VARCHAR, created_at TIMESTAMP)";
  pool.query(table, (err, result) => {
    if (err) throw err;
    next();
  });
}

const postTask = (req, res, next) => {
  if(!req.body) next({err: 'error in postTasks'});
  const { item } = req.body;
  console.log(req.body)
  pool.query('INSERT INTO Tasks (item, created_at) VALUES ($1, NOW())', [item], (err, results) => {
    if(err) next({err});
    return next();
  })
}

const getTasks = (req, res, next) => {
  pool.query('SELECT * FROM Tasks ORDER BY _id ASC', (err, results) => {
    if(err) next({err});
    res.body = results.rows;
    next();
  })
}

const deleteTask = (req, res, next) => {
  if(!req.body) next({err: 'error in deleteTask'});
  const { id } = req.body;
  pool.query('DELETE FROM Tasks WHERE _id = $1', [id], (err, results) => {
    if(err) next({err});
    next();
  })
}

module.exports = {
  createTable,
  postTask,
  getTasks,
  deleteTask
};
