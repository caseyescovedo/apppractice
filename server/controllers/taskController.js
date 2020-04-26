const db = require('../models/TaskModel')

module.exports = {
  //create a new item in the database
  postTask: (req, res, next) => {
    const queryText = `INSERT INTO Tasks (item) VALUES ($1) RETURNING *`;
    db.query(queryText, [req.body.task])
      .then(task => {
        res.locals.task = task.rows[0];
        return next();
      })
      .catch(err => next({
        log: 'Express error handler caught error from taskController.postTask',
        message: { error: 'An error occurred from taskController.postTask' + err },
      }))
  },

  //retrieve all items from the database and send it back to the client as JSON
  getTasks: (req, res, next) => {
    const queryText = `SELECT * FROM Tasks;`;
    db.query(queryText)
    .then(tasks => {
      res.locals.tasks = tasks.rows;
      return next();
    })
    .catch(err => next({
      log: 'Express error handler caught error from taskController.getTasks',
      message: { error: 'An error occurred from taskController.getTasks' + err },
    }))
  },

  //find items in the database based on an ID number and delete that item if it exists
  deleteTask: (req, res, next) => {
    const queryText = `DELETE FROM Tasks WHERE id = $1`;
    db.query(queryText, [req.params.id])
      .then(() => {
        return next();
      })
      .catch(err => next({
        log: 'Express error handler caught error from taskController.deleteTask',
        message: { error: 'An error occurred from taskController.deleteTask' + err },
      }))
    },

};
