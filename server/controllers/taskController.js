const task = require('../models/TaskModel.js');

module.exports = {
  postTask = (req, res, next) => {
    task(req.body.data);
  };

  getTask = (req, res, next) => {
    // should retrieve all items from the database and send it back to the client as JSON
  };

  deleteTask = (req, res, next) => {
    // should find items in the database based on an ID number and delete that item if it exists
  };
};
