const Task = require('../models/TaskModel');

const taskController = {};

// middleware to post a new task to the DOM
taskController.postTask = (req, res, next) => {
  const { item } = req.body;
  // create new date to find time it was created
  const today = new Date();
  const created_at = `${today.getHours()}:${today.getMinutes()}`;
  // create document in mongoDB
  Task.create({ item, created_at }, (err, task) => {
    if (err) return next({ log: err, message: 'there was an error inserting task into the databse' });
    res.locals.task = task;
    return next();
  });
};

// middlware to get all tasks from DB
taskController.getTasks = (req, res, next) => {
    // find all documents in collection
  Task.find((err, tasks) => {
    if (err) return next({ log: err, message: 'there was an error fetching tasks from database' });
    res.locals.tasks = tasks;
    return next();
  });
};
// middleware to delte a task from DB
taskController.deleteTask = (req, res, next) => { 
  const { _id } = req.body;
  Task.deleteOne({ _id }, (err) => {
    if (err) return next({ log: err, message: 'there was an error deleting task from database' });
    return next();
  });
};

module.exports = taskController;
