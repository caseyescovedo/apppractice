const Task = require('../models/TaskModel');

const taskController = {};

taskController.postTask = (req, res, next) => {
  const { item } = req.body;
  const today = new Date();
  const created_at = `${today.getHours()}:${today.getMinutes()}`;
  Task.create({ item, created_at }, (err, task) => {
    if (err) return next({ log: err, message: 'there was an error inserting task into the databse' });
    res.locals.task = task;
    return next();
  });
};

taskController.getTasks = (req, res, next) => {
  Task.find((err, tasks) => {
    if (err) return next({ log: err, message: 'there was an error fetching tasks from database' });
    res.locals.tasks = tasks;
    return next();
  });
};

taskController.deleteTask = (req, res, next) => { 
  const { _id } = req.body;
  console.log(req.body._id)
  Task.deleteOne({ _id }, (err) => {
    if (err) return next({ log: err, message: 'there was an error deleting task from database' });
    console.log('deleted from database')
    return next();
  });
};

module.exports = taskController;
