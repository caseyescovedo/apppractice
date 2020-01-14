// require taskModel
const Task = require('../models/TaskModel');

// create object for module export
const TaskController = {};

// post task controller
TaskController.postTask = (req, res, next) => {
  console.log('req', req.body);
  const item = req.body;
  Task.create(item, (err, newTask) => {
    if (err) {
      return next({
        log: 'Error: ERROR: Error creating tasks in DB.',
        message: {
          err: 'Error occurred in postTask middleware.'
        }
      });
    }
    return next();
  });
};

// get all tasks controller
TaskController.getTasks = (req, res, next) => {
  Task.find({}, (err, tasks) => {
    if (err) {
      return next({
        log: 'Error: ERROR: Error getting tasks from DB.',
        message: {
          err: 'Error occurred in getTasks middleware.'
        }
      });
    }
    res.locals.tasks = tasks;
    return next();
  });
};

// delete a task controller
TaskController.deleteTask = (req, res, next) => {
  Task.findByIdAndDelete(req.query.id, (err, task) => {
    if (err) {
      return next({
        log: 'Error: ERROR: Error deleting this task from DB.',
        message: {
          err: 'Error occurred in deleteTask middleware.'
        }
      });
    }
    res.locals.taskDeleted = task;
    return next();
  });
};

module.exports = TaskController;
