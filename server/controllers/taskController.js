const db = require('../models/TaskModel');

module.exports = {
  postTask: function(req, res, next) {
    const { item } = req.body;
    const queryString = `
      INSERT into Task (item)
      VALUES ($1);
    `;
    const values = [item];
    db.query(queryString, values, (err) => {
      if (err) return next({
        log: 'Error in postTask controller',
        status: 500,
        message: { err }
      });
      return next();
    });
  },
  getTasks: function(req, res, next) {
    const queryString = 'SELECT * FROM Task';
    db.query(queryString, (err, tasks) => {
      if (err) return next({
        log: 'Error in getTasks controller',
        status: 500,
        message: { err }
      });
      res.locals.getTasks = tasks.rows;
      return next();
    });
  }, 
  deleteTask: function(req, res, next) {
    const { id } = req.body;
    console.log(id);
    const queryString = `
      DELETE FROM Task
      WHERE id = $1;
    `;
    const values = [id];
    db.query(queryString, values, (err) => {
      if (err) return next({
        log: 'Error in deleteTask controller',
        status: 500,
        message: { err }
      });
      return next();
    });
  }
};
