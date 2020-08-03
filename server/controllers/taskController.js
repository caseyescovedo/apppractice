const Task = require('../models/TaskModel');

const taskController = {};

taskController.addTask = (req, res, next) => {
  console.log('hi im addTask')
  const { item } = req.body;

  Task.create({ item })
  .then((todo) => {
    res.locals.data = todo;
    return next()
  })
  .catch((err) => next(err))
}

taskController.getTasks = (req, res, next) => {
  Task.find({}).exec()
  .then((todo) => {
    res.locals.data = todo;
    return next();
  })
  .catch((err) => next(err))
}

taskController.deleteTask = (req, res, next) => {
  const { id } = req.params;

  Task.findByIdAndDelete(id).exec()
  .then((todo) => {
    res.locals.data = todo;
    return next()
  })
  .catch((err) => next(err));
}

module.exports = taskController;


