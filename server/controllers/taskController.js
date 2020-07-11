const Task = require('../models/TaskModel');

const tasksController = {};


tasksController.getTasks = async (req, res, next) => {
  const tasks = await Task.find();
  res.locals.tasks = tasks;
  return next();
};

tasksController.postTask = (req, res, next) => {
  const { item, created_at } = req.body;
  const task = new Task({ item, created_at });

  return task.save()
  .then((result) => {
    res.locals.result = result;
    return next();
  })
  .catch((error) => {
    return next(error);
  });
};

tasksController.deleteTask = async (req, res, next) => {
  const { _id } = req.body;
  const task = { _id };
  const result = await Task.deleteOne(task);
  res.locals.result = result;
  return next();
};

module.exports = tasksController;
