const Task = require('../models/TaskModel');

// function for saving a new task to the database
const createTask = (req, res, next) => {
  const item = req.body.taskToAdd;

  const newTask = new Task({ item });

  newTask.save((err, newTask) => {
    if (err) {
      return next({
        log: `createTask: ERROR: ${err}`,
        message: {
          err: 'Error occurred in createTask'
        }
      });
    }
    // set the status to 201, 'created'
    res.status(201);
    return next();
  });
};

// function for retrieving ALL existing tasks from the DB
const getTasks = (req, res, next) => {
  Task.find({}, (err, tasks) => {
    if (err) {
      return next({
        log: `getTasks: ERROR: ${err}`,
        message: {
          err: 'Error occurred in getTasks'
        }
      });
    }

    // if we didn't find any messages, immediately return
    if (!tasks) {
      return res.status(500).send('Unable to retrieve tasks');
    }

    // otherwise if we found tasks, attach them to res.locals and move to the next middleware
    res.locals.tasks = tasks;
    return next();
  });
};

// find items in the database based on an ID number and delete that item if it exists
const deleteTask = (req, res, next) => {
  const { id } = req.params;

  // this might need to be 'findoneanddelete'
  Task.findByIdAndDelete({ _id: id }, (err, task) => {
    if (err) {
      return next({
        log: `deleteTask: ERROR: ${err}`,
        message: {
          err: 'Error occurred in deleteTask'
        }
      });
    }

    // if we didn't find any task, immediately return
    if (!task) {
      return res.status(500).send('Unable to delete task');
    }

    return next();
  });
};

module.exports = { createTask, getTasks, deleteTask };
