const taskModel = require('../models/TaskModel');

module.exports = {
  postTask: async (req, res, next) => {
    try {
      const { item } = req.body;
      res.locals.newTask = await taskModel.create({ item });
      return next();
    } catch (err) {
      return next({
        log: `error occurred at postTask middleware. error message is: ${err}`,
        status: 400,
        message: { err: 'An error occurred' },
      });
    }
  },

  getTasks: async (req, res, next) => {
    try {
      res.locals.tasks = await taskModel.find();
      return next();
    } catch (err) {
      return next({
        log: `error occurred at getTasks middleware. error message is: ${err}`,
        status: 400,
        message: { err: 'An error occurred' },
      });
    }
  },

  deleteTask: async (req, res, next) => {
    try {
      const { id } = req.params;
      await taskModel.findByIdAndDelete(id);
      return next();
    } catch (err) {
      return next({
        log: `error occurred at deleteTask middleware. error message is: ${err}`,
        status: 400,
        message: { err: 'An error occurred' },
      });
    }
  },
};
