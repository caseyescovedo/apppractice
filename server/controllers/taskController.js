const Task = require('../models/TaskModel');
const taskController = {};

taskController.postTask = (req, res, next) => {
  Task.create({ item: req.body.item })
    .then(task => {
      res.locals.item = task;
      return next();
    })
    .catch(err => {
      console.log('ERROR POSTING TASK INTO DB');
      next(err);
    });
}

taskController.getTasks = (req, res, next) => {
  Task.find({})
    .exec()
    .then(tasks => {
      res.locals.getTasks = tasks;
      return next();
    })
    .catch(err => {
      console.log('ERROR GETTING TASK FROM DB');
      next(err);
    })
}

taskController.deleteTask = (req, res, next) => {
  Task.findOneAndDelete({ _id: req.params.id})
    .then(deletedTask => {
      res.locals.deleted = deletedTask;
      return res.status(200);
    })
    .catch(err => {
      console.log('ERROR DELETING TASK FROM DB');
      return res.status(418);
    })
}

module.exports = taskController;
