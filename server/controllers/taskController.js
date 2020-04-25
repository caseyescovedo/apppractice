const Task = require('../models/TaskModel');

module.exports = {
  // Post task
  postTask: async (req, res, next) => {
    try {
      const { item } = req.body;
      res.locals.result = await Task.create({ item });
      return next();
    } catch (error) {
      return next(error);
    }
  },
  // Retrieve all tasks in collection
  getTasks: async (req, res, next) => {
    try {
      res.locals.tasks = await Task.find({});
      return next();
    } catch (error) {
      return next(error);
    }
  },
  // Delete a single task by ID number (passed in thru body)
  deleteTask: async (req, res, next) => {
    const { id } = req.body;
    try {
      res.locals.result = await Task.findByIdAndDelete(id);
      return next();
    } catch (error) {
      return next(error);
    }
  }

};
