// CREATE MIDDLEWARE IN THIS FILE, EXPORT AND PULL IN ON SERVER.JS

// require in Task model
const Task = require('../models/TaskModel');

// const taskController = {};
const taskController = {};

// *** POST a new task to the database (create new task, and POST it) ****
taskController.postTask = (req, res, next) => {
  // pull the item key that is stored on the request body using deconstruction
  const { item } = req.body;
  // create a new item using the name pulled from the request body
  Task.create({ item })
    // store the item in res.locals.task
    .then(item => {
      res.locals.task = item;
      console.log('New task added to the database!');
      // Its not clear if you want all of this done on this page, but I am going to send the response back to the front end from server.js because
      // it looks cleaner and I am more familiar with that format
      // res.status(200).json(res.locals.task); /
      return next();
    })
    .catch(err => {
      return next({
        log: `ERROR: taskController.createTask: ERROR ${err}`,
        message: `ERROR: taskController.createTask: ERROR see server log for details`
      });
    });
};

// *** GET all tasks from the database ***
taskController.getTasks = (req, res, next) => {
  Task.find({})
    .exec()
    .then(tasks => {
      console.log(tasks);
      res.locals.tasks = tasks;
      return next();
    })
    .catch(err => {
      return next({
        log: `ERROR: taskController.getTasks: ERROR ${err}`,
        message: `ERROR: taskController.getTasks: ERROR see server log for details`
      });
    });
};

// *** DELETE an item from the database by :id ***

// deleting functionality seems to work, but will need to come back to this. Spending too much time here

taskController.deleteTask = (req, res, next) => {
  // console.log(req.params);
  const { id } = req.params;

  Task.findOneAndDelete(id)
    .exec()
    .then(item => {
      // console.log(item);
      item.remove();
      res.locals.removed = item;
      // console.log('Task Removed!');
      return next();
    })
    .catch(err => {
      return next({
        log: `ERROR: taskController.deleteTask: ERROR: ${err}`,
        message: `ERROR: taskController.deleteTask: ERROR: see server log for details`
      });
    });
};

module.exports = taskController;
