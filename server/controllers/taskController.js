//import mongoose model
const Task = require("../models/TaskModel");

//initialize task controller
const taskController = {};

//middleware for posting a task item to the table
taskController.addTask = (req, res, next) => {
  //extract task and created at from request body
  const { item, created_at } = req.body;
  //add a new task
  Task.create({ item, created_at })
    //attach the updated entry to the response
    .then((data) => {
      res.locals.data = data;
      return next();
    })
    //send additional information to update errObj in global error handler
    .catch((err) => {
      return next({
        log: "Error in add task middleware, " + err,
        message: "POST request not implemented",
        status: 501,
      });
    });
};

//middleware for getting task table items
taskController.getTasks = (req, res, next) => {
  //utilize find and execute to grab entire table of task items
  Task.find()
    .exec()
    //attach the "found" data to the response
    .then((data) => {
      res.locals.data = data;
      return next();
    })
    //send additional information to update errObj in global error handler
    .catch((err) => {
      return next({
        log: "Error in get task middleware, " + err,
        message: "GET request not implemented",
        status: 501,
      });
    });
};

//middleware for deleting a task item from table
taskController.deleteTask = (req, res, next) => {
  //isolate id from the request parameters
  const id = req.params.id;
  //console.log(req.params.id)
  //use 'find by Id and delete' + 'execute' to remove the task item from the table
  Task.findByIdAndDelete(id)
    .exec()
    //attach the deleted entry to the response
    .then((data) => {
      res.locals.data = data.id;
      return next();
    })
    //send additional information to update errObj in global error handler
    .catch((err) => {
      return next({
        log: "Error in delete task middleware, " + err,
        message: "DELETE request not implemented",
        status: 501,
      });
    });
};

module.exports = taskController;
