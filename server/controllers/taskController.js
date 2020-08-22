/** ===== Require in PostgreSQL model ===== */
const db = require('../models/TaskModel');

module.exports = {
  postTask: (req, res, next) => {
    const queryString = 
      `INSERT INTO Task (item, created_at)
      VALUES ($1, $2)
      RETURNING item, created_at;`
    const queryValues = [req.body.item, req.body.created_at];
    
    db.query(queryString, queryValues)
      .then(queryRes => {
        res.locals.newTask = queryRes.rows;
        return next();
      })
  },

  getTasks: (req, res, next) => {
    const queryString = 
      `SELECT item, created_at
      FROM Task;`
    
    db.query(queryString)
      .then(queryRes => {
        res.locals.tasks = queryRes.rows;
        return next();
      })
  },

  deleteTask: (req, res, next) => {
    const queryString = 
      `DELETE FROM Task
      WHERE created_at = $1`;
    const queryValues = [req.body.created_at];
    
    db.query(queryString, queryValues)
      .then(queryRes => {
        res.locals.deletedTask = queryRes.rows;
        return next();
      })
  },
};
