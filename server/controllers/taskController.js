const Tasks = require('../models/TaskModel.js');

const taskController = {};

taskController.postTask = (req, res, next) => {
  const { item } = req.body;
    Tasks.create({ item })
    .then(taskDoc => {
      res.locals.data = taskDoc;
      next();
    })
    .catch(err => next(err));
}

taskController.getTasks = (req, res, next) => {
  Tasks.find().exec()
    .then(taskDocs => {
      res.locals.data = taskDocs;
      next();
    })
    .catch(err => next(err));
}

taskController.deleteTasks = (req, res, next) => {
  Tasks.findOneAndDelete(req.params.id).exec()
    .then(taskDeleted => {
      res.locals.data = taskDeleted;
      console.log('Task was deleted: ', taskDeleted);
      next();
    })
    .catch(err => next(err));
}

module.exports = taskController;
