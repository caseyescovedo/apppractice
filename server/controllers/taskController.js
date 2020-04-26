const Task = require('../models/TaskModel');

const taskController = {};

taskController.postTask = (req, res, next) => {
  const { item } = req.body;

  Task.create({ item })
  .then(taskDoc => {
    res.locals.data = taskDoc;
    next();
  })
  .catch(err => next(err));
}

taskController.getTasks = (req, res, next) => {
  Task.find().exec()
  .then(taskDocs => {
    res.locals.data = taskDocs;
    next();
  })
  .catch(err => next(err));
}

taskController.deleteTask = (req, res, next) => {
  Task.findByIdAndDelete(req.params.id).exec()
    .then(taskDoc => {
      res.locals.data = taskDoc;
      next();
    })
    .catch(err => next(err));
}


module.exports = taskController;
