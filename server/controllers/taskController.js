const mongoose = require('mongoose');
const Task = require('./../models/TaskModel.js');

const taskController = {};

// create a new item in the database
taskController.postTask = (req, res, next) => {
  const newTask = req.body;
  console.log('post', newTask);

  Task.create(newTask, (err, tasks) => {
    if (err) {
      return next(err);
    }
    return next();
  });
};

// retrieve ALL items from the database and send back as JSON
taskController.getTasks = (req, res, next) => {
  console.log('getting tasks, one moment');

  Task.find({}, (err, tasks) => {
    if (err) {
      return next(err);
    }
    res.locals = tasks;
    return next();
  });
};

// find items based on ID and delete if they exist
taskController.deleteTask = (req, res, next) => {
  const taskItem = req.body;

  Task.findOneAndDelete(taskItem, (err, tasks) => {
    if (err) {
      return next(err);
    }
    res.locals = tasks;
    return next();
  });
};

module.exports = taskController;
