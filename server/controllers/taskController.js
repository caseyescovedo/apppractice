const db = require('../models/TaskModel.js');

module.exports = {
  getTasks: (req, res, next) => {
    const query = `SELECT * FROM tasks`;
    const results = db.sendToDatabase(query);

    res.locals.tasks = result.rows;
    return next();
  },

  postTask: (req, res, next) => {
    const query = `INSERT INTO tasks (item, created_at) VALUES ('${req.body.task}', CURRENT_TIMESTAMP) returning *`;

    const result = db.sendToDatabase(query);
    // return taskId to use on front-end
    res.locals.taskId = result.rows[0]._id;
    return next();
  },

  deleteTask: (req, res, next) => {
    const query = `DELETE FROM tasks WHERE _id = ${req.body.taskId}`;
    db.sendToDatabase(query);
    return next();
  }
};
