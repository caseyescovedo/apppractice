const pool = require('../models/TaskModel.js');

module.exports = {
  postTask: (req, res, next) => {
    console.log('in taskControl postTask', req.body.task);
    const queryText = `INSERT INTO Tasks (item) VALUES ($1) RETURNING *`;
    const queryVal = [req.body.task];
    pool.query(queryText, queryVal)
      .then(data => {
        console.log(data.rows);
        res.locals.addTask = data.rows
        next();
      })
      .catch(e => next(`Error inserting to DB ${e}`));
  },
  getTasks: (req, res, next) => {
    const queryText = `SELECT * FROM Tasks`;
    pool.query(queryText)
      .then(data => {
        res.locals.tasks = data.rows;
        next();
      })
      .catch(e => next(`Error getting data from DB ${e}`))
  },
  deleteTask: (req, res, next) => {
    const queryText = `DELETE FROM Tasks WHERE id=$1`;
    const queryVal = [req.body.id];
    pool.query(queryText, queryVal)
      .then(data => {
        res.locals.deleted = data.rows;
        console.log(data.rows);
        next();
      })
      .catch(e => next(`Error deleting data from DB ${e}`))
  }

};
