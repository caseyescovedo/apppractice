const Task = require('../models/TaskModel');

const taskController = {};

taskController.postTask = (req, res, next) => {
  if (req.body === undefined) return res.sendStatus(500);
  const { item } = req.body;
  if (typeof item !== 'string') return res.sendStatus(500);
  Task.create({ item })
    .then((resp) => {
      const { _id: taskId } = resp;
      res.locals.taskId = taskId;
      next();
    })
    .catch(next);
};

taskController.getTasks = (req, res, next) => {
  Task.find()
    .exec()
    .then((resp) => {
      res.locals.tasks = resp;
      next();
    })
    .catch(next);
};

taskController.deleteTask = (req, res, next) => {
  const { taskId } = req.body;
  Task.findByIdAndDelete({ _id: taskId })
    .then((resp) => {
      const { _id: deletedId } = resp;
      res.locals.deletedId = deletedId;
      next();
    })
    .catch(next);
};

module.exports = taskController;
