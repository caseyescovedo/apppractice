const Task = require('../models/TaskModel');

const taskController = {};

taskController.postTask = (req, res, next) => {
  const { item } = req.body;
  const today = new Date();
  const created_at = `${today.getHours()}:${today.getMinutes()}`;
  Task.create({ item, created_at }, (err, task) => {
    if (err) return next({ log: err, message: 'there was an error inserting task into the databse' });
    next();
  });
};

taskController.getTasks = (req, res, next) => {
  Task.find((err, tasks) => {
    if (err) return next({ log: err, message: 'there was an error fetching tasks from database' });
    res.locals.tasks = tasks;
  });
};


module.exports = taskController;
