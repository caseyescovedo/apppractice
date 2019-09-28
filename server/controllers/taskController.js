const db = require('../models/TaskModel.js');

module.exports = {
  getTasks: (req, res, next) => {
    res.locals.tasks = ['item1', 'item2'];
    return next();
  },

  postTask: (req, res, next) => {
    const query = `INSERT INTO tasks (item, created_at) VALUES ('${req.body.task}', CURRENT_TIMESTAMP) returning *`;

    const taskId = db.sendToDatabase(query);
    // return taskId to use on front-end
    res.locals.taskId = taskId;
    return next();
  },

  deleteTask: (req, res, next) => {
    const query = `DELETE FROM tasks WHERE _id = ${req.body.taskId}`;
    db.sendToDatabase(query);
    return next();
  }
};
