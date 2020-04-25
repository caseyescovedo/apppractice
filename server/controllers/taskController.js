const Task = require('../models/TaskModel');

const taskController = {}

  taskController.getTasks = (req, res, next) => {
    Task.find({})
    .then(tasks => {
      res.locals.data = tasks;
      next();
    })
    .catch(err => next(err));
  }

  taskController.postTask = (req, res, next) => {
    const { name } = req.body;
    Task.create({item: name})
    .then(resp => {
      res.locals.task = resp;
      next();
    })
    .catch(err => next(err));
  }
  taskController.delete = (req, res, next) => {
    const {name} = req.body;
    Task.deleteOne({item: name})
    .then()
  }

module.exports = taskController;
