const Task = require('../models/TaskModel.js');

const taskController = {};

taskController.postTask = (req, res, next) => {
  const { item } = req.body;

  Task.create({ item })
    .then(task => {
      res.locals.data = task;
      return next();
    })
    .catch(err => next(err));
}

taskController.getTasks = (req, res, next) => {
  Task.find({}).exec()
    .then(tasks => {
      res.locals.data = tasks;
      return next();
    })
    .catch(err => next(err));
}

taskController.deleteTask = (req, res, next) => {
  const { id } = req.params;

  Task.findByIdAndDelete(id).exec()
    .then(task => {
      res.locals.data = task;
      return next();
    })
    .catch(err => next(err));
}

module.exports = taskController;
