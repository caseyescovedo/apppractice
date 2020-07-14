const { Pool } = require('pg');

  const postTask = async (req, res, next) => {
    const { task } = req;
    const res = await pool.query('INSERT INTO tasks.item VALUES($1) RETURNING *', [task]);
    return next();
  }

  const getTasks = async (req, res, next) => {
    const tasks = await pool.query('SELECT * FROM tasks.item');
    res.status(200).send(tasks);
    return next();
  }

  const deleteTask = {
    const { task } = req;
    const task = await pool.query('SELECT * FROM tasks.item = $1', [task]);
    return next();
  }


module.exports = {postTask,getTasks,deleteTask};
