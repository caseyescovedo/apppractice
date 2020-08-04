const db = require('../models/TaskModel');

module.exports = {
  postTask: function(req, res, next) {
    const { taskInput } = req.body;
    const query = `INSERT INTO task (item) values($1) RETURNING *`;
    const values = [taskInput];
    db.query(query, values, (err, newTask) => {
      if (err) return next({ location: 'postTask', log: err });
      res.locals.data = newTask.rows[0];
      return next();
    });
  },
  getTasks: function(req, res, next) {
    const query = `SELECT * FROM task`;
    db.query(query, (err, tasks) => {
      if (err) return next({ location: 'getTasks', log: err });
      res.locals.data = tasks.rows;
      return next();
    });
  },
  deleteTask: function(req, res, next) {
    const { id } = req.params;
    console.log('id', req.params)
    const query = `DELETE FROM task WHERE id=$1 RETURNING *`;
    const values = [Number(id)];
    db.query(query, values, (err, result) => {
      if (err) return next({ location: 'deleteTask', log: err });
      res.locals.data = result.rows[0];
      return next();
    });
  }
};
