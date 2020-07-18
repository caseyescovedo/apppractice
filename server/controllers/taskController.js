// bring in model
const models = require('../models/TaskModel');

// create task controller
const taskController = {};

// define middleware functions
taskController.postTask = (req, res, next) => {
  const { item } = req.body;
  models
    .create({ item })
    .then((result) => {
      res.locals.tasks = result;
      return next();
    })
    .catch((err) => {
      next({
        log: 'Error in postTask',
        message: { err: `Error is ${err}` },
      });
    });
};

taskController.getTasks = (req, res, next) => {
  models
    .find()
    .exec()
    .then((taskList) => {
      res.locals.tasks = taskList;
      return next();
    })
    .catch((err) => {
      next({
        log: 'Error in getTasks',
        message: { err: `Error is ${err}` },
      });
    });
};

taskController.deleteTask = (req, res, next) => {
  const { id } = req.params;
  models
    .findByIdAndDelete(id)
    .exec()
    .then((taskList) => {
      res.locals.tasks = taskList;
      return next();
    })
    .catch((err) => {
      next({
        log: 'Error in deleteTask',
        message: { err: `Error is ${err}` },
      });
    });
};

// export task controller
module.exports = taskController;
