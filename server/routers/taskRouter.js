const express = require('express');
const taskController = require('../controllers/taskController');
const cookieParser = require('cookie-parser');
const taskRouter = express.Router();

taskRouter.use(cookieParser());

// /secret CRUD
// READ - a get request to read all items in the db table
taskRouter.get('/', taskController.getTasks, (req, res) => {
  console.log('getTasks res.locals.info', res.locals.info);
  res.status(200).json(res.locals.info);
  //   res.status(200).cookie('raisin', 11).json(res.locals.info);
  //   console.log('req.cookies', req.cookies);
});

// CREATE - a post request to add an item
taskRouter.post('/', taskController.postTask, (req, res) => {
  res.status(200).json(res.locals.post);
});

// DELETE - a delete request to delete an item
taskRouter.delete('/', taskController.deleteTask, (req, res) => {
  res.status(200).json(res.locals.delete);
});

module.exports = taskRouter;
