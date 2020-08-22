const db = require('../models/TaskModel');


module.exports = {
  postTask: (req, res, next) => {
    const { task } = req.body;

    const queryString = `INSERT INTO Task (item) VALUES ($1)`
    db.query(queryString, [task])
      .then(data => {
        next();
      })
      .catch(err => next(err))
  },
  getTasks: (req, res, next) => {
    const queryString = `SELECT * FROM Task`
    console.log("im here")
    db.query(queryString)
      .then(data => {
        console.log("OK")
        res.locals.tasks = data.rows
        next();
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
        next();
      })
      .catch(err => next(err))
  },

};
