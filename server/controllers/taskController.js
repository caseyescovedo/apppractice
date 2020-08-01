const Task = require('../models/TaskModel')

module.exports = {
  // Create new task
  postTask(req, res, next) {
    console.log('inside postTask', req.body);
    const { item } = req.body;
    Task.create({ item }, (err, task) => {
      if (err) return next(err);
      res.locals.task = task;
      return next();
    });
  },
  // Get all tasks
  getTasks(req, res, next) {
    Task.find({}, (err, tasks) => {
      if (err) return next(err);
      res.locals.tasks = tasks;
      return next();
    });
  },
  // Delete task(s)
  deleteTask(req, res, next) {
    const { _id } = req.body;
    Task.find({ _id }, (err, deleted) => {
      if (err) return next(err);
      res.locals.deleted = deleted;
      return next();
    });
  },
};
