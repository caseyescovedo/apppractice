const db = require('../models/TaskModel');


module.exports = {
  postTask: (req, res, next) => {
    const { task } = req.body;

    const queryString = `INSERT INTO Task (item) VALUES ($1) RETURNING id, item, created_at`
    db.query(queryString, [task])
      .then(data => {
        res.locals.newTask = data.rows[0]
        console.log(res.locals.newTask)
        return next();
      })
      .catch(err => next(err))
  },
  getTasks: (req, res, next) => {
    const queryString = `SELECT * FROM Task`
    db.query(queryString)
      .then(data => {
        res.locals.tasks = data.rows
        return next();
      })
      .catch(err => {
        console.log('err')
        next(err)
      })
  },
  deleteTask: (req, res, next) => {
    const { id } = req.params;

    const queryString = `DELETE FROM Task WHERE id=$1`
    db.query(queryString, [id])
      .then(data => {
        return next();
      })
      .catch(err => next(err))
  },

};
