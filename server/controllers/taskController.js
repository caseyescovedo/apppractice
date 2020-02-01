const Task = require('../models/TaskModel.js');

// I know I'm supposed to be routing my routes from server.js here but I couldn't get this
// working. I kept getting the error TaskController.getTasks is not a function, etc.
// I couldn't figure it out as they ARE functions. I tried going TaskController.getTasks
// here instead of the current way of having one const up top with individual functions within.
// I made sure I am requiring in the TaskController page in server.js. I tried exporting the 
// individual functions as well but eventually gave up to save time and doing it all in the
// server.js page

const TaskController = {

  // create new item in database
  // TaskController.postTask((req, res, next) => {
  //   // functionality here
  // });

  // get tasks from the database
  getTasks(req, res, next) {
  // use req.params to get
    next();
  },

  // // delete a specific task from the database
  // TaskController.deleteTask((req, res, next) => {
  //   // use req.params to delete
  // });

};

module.exports = {
  TaskController,
};
