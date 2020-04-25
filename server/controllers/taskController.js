const db = require('../models/TaskModel');

module.exports = {
  
  postTask(req, res, next) {
    const { item } = req.body;
    const query = `INSERT INTO "Task" (item) VALUES ($1)`;

    db.query(query, [item])
      .then(() => next())
      .catch((err) => {
        next({
          log: 'Something went wrong in taskController.addTask',
          msg: err,
        });
      });
  },

  getTasks(req, res, next) {
    const query = `SELECT * FROM "Task"`;
    db.query(query)
      .then((result) => {
        res.locals.tasks = result.rows;
        next();
      })
      .catch((err) => {
        next({
          log: 'Something went wrong in taskController.getTasks',
          msg: err,
        });
      });
  },

  deleteTask(req, res, next) {
    const { _id } = req.body;
    const query = `DELETE FROM "Task" WHERE _id = $1`;
    db.query(query, [_id])
      .then(() => next())
      .catch((err) => {
        next({
          log: 'Something went wrong in taskController.deleteTask',
          msg: err,
        });
      });
  },
};
