const Task = require('../models/TaskModel.js');

const TaskController = {};

// get tasks from the database
TaskController.getTasks = (req, res, next) => {
  console.log('made it to getTasks');
  Task.find((err, results) => {
    if (err) return console.log(err);
    res.json(results);
    return next();
  });
};

// create new item in database
TaskController.postTask = (req, res) => {
  Task.create(req.body, (err, results) => {
    if (err) console.log(err);
  });
};

// delete a specific task from the database
TaskController.deleteTask = (req, res, next) => {
  Task.findByIdAndDelete(req.params.id, (err, results) => {
    if (err) console.log(err);
  });
};

module.exports = TaskController;
