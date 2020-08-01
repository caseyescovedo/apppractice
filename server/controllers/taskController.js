const Task = require('../models/TaskModel');

const taskController = {};

taskController.postTask = (req, res, next) => {
  Task.create({ item: req.body.item })
    .then((itemDoc) => {
      res.locals.data = itemDoc;
      return next();
    })
    .catch((err) => next(err));
};

taskController.getTasks = (req, res, next) => {
  Task.find()
    .then((itemDoc) => {
      res.locals.data = itemDoc;
      return next();
    })
    .catch((err) => next(err));
};

taskController.deleteTask = (req, res, next) => {
  Task.findByIdAndDelete(req.body.id).exec()
    .then((itemDoc) => {
      res.locals.data = itemDoc;
      return next();
    })
    .catch((err) => next(err));
};

module.exports = taskController;
