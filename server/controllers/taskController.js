const Task = require('../models/TaskModel');

const taskController = {};

taskController.addTask = (req, res, next) => {
  const { item } = req.body;

  Task.create({ item })
  .then((todo) => {
    res.locals.data = todo;
    return next()
  })
  .catch((err) => next(err))
}

taskController.getTasks = (req, res, next) => {
  Ｔask.find({}).exect()
  .then((todo) => {
    res.locals.data = todo;
    return next();
  })
  .catch((err) => next(err))
}

taskController.deleteTask = (req, res, next) => {
  const { id } = req.params;

  Ｔask.findByIdAndDelete(id).exec()
  .then((todo) => {
    res.locals.data = todo;
    return next()
  })
  .catch((err) => next(err));
}

module.exports = taskController;


