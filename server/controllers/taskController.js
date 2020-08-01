const Task = require('../models/TaskModel.js');

module.exports = {
  postTask: (req, res, next) => {
    Task.create({ item: req.body.item }, (err, task) => {
      if (err) return next(err);
      res.locals.task = task;
      return next();
    });
  },

  getTasks: (req, res, next) => {
    Task.find({}, (err, tasks) => {
      if (err) return next(err);
      res.locals.tasks = tasks;
      return next();
    });
  },

  deleteTask: (req, res, next) => {
    Task.findOneAndDelete({ _id: req.body.id }, (err, deleted) => {
      if (err) return next(err);
      return next();
    });
  },
};
