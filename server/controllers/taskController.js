const Task = require("../models/TaskModel");

taskController = {};

taskController.postTasks = (req, res, next) => {
  const task = {
    task: req.body.task,
  };
  Task.create(task, (err, result) => {
    if (err) return next(err);
    else {
      res.locals.newTask = result;
      return next();
    }
  });
};
taskController.getTasks = (req, res, next) => {
  Task.find({})
    .exec()
    .then((results) => {
      res.locals.tasks = results;
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};
taskController.deleteTasks = (req, res, next) => {
  const itemId = req.body.id;
  Task.deleteOne({ _id: itemId }, (err) => {
    if (err) return next(err);
    else {
      res.locals.bool = true;
      return next();
    }
  });
};
module.exports = taskController;
