const express = require('express');

const Router = express.Router();
const taskController = require('../controllers/taskController');

// gets everything from the tasks table in the db
// responds with every row from the task table
Router.get('/',
  taskController.getTasks,
  (req, res) => {
    res.status(200).json(res.locals.tasks);
  });

// inserts a new row into the tasks table in the db
// req.body takes in item and createdAt (time)
// responds with the row that was just added
Router.post('/',
  taskController.postTask,
  (req, res) => {
    res.status(200).json(res.locals.response);
  });

// deletes row from tasks table in the db based on id
// responds with the row that was deleted
Router.delete('/',
  taskController.deleteTask,
  (req, res) => {
    res.status(200).json(res.locals.response);
  });

module.exports = Router;
