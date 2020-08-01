const Task = require('../models/TaskModel');

const taskController = {};

// should retrieve all items from the database and send it back to the client as JSON
taskController.getTasks = async (req, res, next) => {
  try {
    res.locals.tasks = await Task.find({});
    return next();
  } catch (err) {
    return next({ log: err });
  }
};

// should create a new item in the database
taskController.postTask = async (req, res, next) => {
  const { item } = req.body;

  if (typeof item === 'string') {
    try {
      await Task.create({ item });
      return next();
    } catch (err) {
      return next({ log: err });
    }
  }

  return next({ log: 'ERROR in taskController.postTask: no valid item to write', status: 400 });
};

// should find items in the database based on an ID number and delete that item if it exists
taskController.deleteTask = async (req, res, next) => {
  const { id } = req.params;

  if (id) {
    try {
      await Task.findByIdAndDelete(id);
      return next();
    } catch (err) {
      return next({ log: err });
    }
  }

  return next({ log: 'ERROR in taskController.deleteTask: no id provided', status: 400 });
};

module.exports = taskController;
