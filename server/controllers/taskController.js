const pool = require('../models/TaskModel');

const postTask = (req, res, next) => {
  //Function postTask should create a new item in the database

  next();
};

const getTasks = (req, res, next) => {
  // Function getTasks should retrieve all items from the database and send it back to the client as JSON

  next();
};

const deleteTask = (req, res, next) => {
  //  Function deleteTask should find items in the database based on an ID number and delete that item if it exists

  next();
};

module.exports = {
  postTask,
  getTasks,
  deleteTask
};
