const Task = require('../models/TaskModel');

const taskController = {};

taskController.postTask = (req, res, next) => {
  const { task } = req.body;
  Task.create({
    item: task
  })
    .then(taskDoc => {
      res.locals.task = taskDoc;
      return next();
    })
    .catch(err => next(err));
}

taskController.getTasks = (req, res, next) => {
  Task.find({})
    .exec()
    .then(tasks => {
      res.locals.tasks = tasks;
      return next();
    })
    .catch(err => next(err));
}

taskController.deleteTask = (req, res, next) => {
  const { id } = req.body;

  Task.findByIdAndDelete(id)
    .exec()
    .then(() => {
      return next();
    })
    .catch(err => next(err));
}

module.exports = taskController;
