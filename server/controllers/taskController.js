const db = require('../models/TaskModel');


module.exports = {
  postTask: (req, res, next) => {
    const { task } = req.body;
    //insert and return row
    //NOTE - DB setup to automatically add timestamp, so only item must be sent in query string
    const queryString = `INSERT INTO Task (item) VALUES ($1) RETURNING id, item, created_at`
    db.query(queryString, [task])
      .then(data => {
        //attach row to res.locals to return to client
        res.locals.newTask = data.rows[0]
        return next();
      })
      .catch(err => next(err))
  },
  getTasks: (req, res, next) => {
    const queryString = `SELECT * FROM Task`
    db.query(queryString)
      .then(data => {
        //send list of tasks back to client
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
