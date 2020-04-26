const Task = require('../models/TaskModel');

const taskController = {};

taskController.postTask = (req, res, next) => {
  const { item } = req.body
  Task.create({ item })
    .then(data => {
      res.locals.data = data;
      next()
   })
  .catch(err => next(err))
}

taskController.getTasks = (req, res, next) => {
  Task.find().exec()
    .then(data => {
      res.locals.data = data;
      next()
    })
    .catch(err => next(err))
}

taskController.deleteTask = (req, res, next) => {
  Task.findByIdAndDelete(req.params.id).exec()
    .then(data => {
      res.locals.data = data;
      next()
    })
    .catch(err => next(err))
}

module.exports = taskController;