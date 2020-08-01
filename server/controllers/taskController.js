const Task = require('../models/TaskModel');

const taskController = {};

taskController.postTask = (req, res, next) => {
  const { item } = req.body;

  Task.create({ item })
  .then((taskData) => {
    res.locals.data = taskData;
    return next();
  })
  .catch((err) => next(err));
}

taskController.getTasks = (req, res, next) => {
  
  // use .exec because Mongo method, allows use of promises
  Task.find({}).exec()
  .then((taskData) => {
    res.locals.data = taskData;
    return next();
  })
  .catch((err) => next(err));
}

taskController.deleteTask = (req, res, next) => {
  const { id } = req.params;

  Task.findByIdAndDelete(id).exec()
  .then((taskData) => {
    res.locals.data = taskData;
    return next();
  })
  .catch((err) => next(err))
}

module.exports = taskController
