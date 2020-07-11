const Task = require('../models/TaskModel');

const tasksController = {};


tasksController.getTasks = async (req, res, next) => {
  console.log('Invoked tasksController.getTasks');

  const tasks = await Task.find();
  res.locals.tasks = tasks;
  return next();
};

tasksController.postTask = (req, res, next) => {
  console.log('Invoked tasksController.postTask');
  console.log('req.body', req.body);
  const { item, created_at } = req.body;
  const task = new Task({ item, created_at });

  return task.save()
  .then((result) => {
    console.log('Task saved to the DB!');
    console.log('result', result);
    res.locals.result = result;
    return next();
  })
  .catch((error) => {
    console.log('Task error when saving to DB: ', error);
    return next(error);
  });
};

tasksController.deleteTask = async (req, res, next) => {
  console.log('Invoked tasksController.deleteTask');
  console.log('req.body', req.body);
  const { _id } = req.body;
  const task = { _id };
  const result = await Task.deleteOne(task);
  console.log('result is', result);
  res.locals.result = result;
  return next();
};

module.exports = tasksController;
