const Task = require('../models/TaskModel');

module.exports = {
  postTask: async (req, res, next) => {
    // console.log('req.body in postTask', req.body);
    try {
      await Task.create({ ...req.body }, (err, record) => {
        console.log('created record', record);
        // res.locals.newTask = record;
      });
      return next();
    } catch (err) {
      return next({
        log: `An error occurred in postTask ${err}`,
        message: { err: 'An error occurred, check server for more details' },
      });
    }
  },

  getTasks: async (req, res, next) => {
    try {
      const response = await Task.find({});
      res.locals.allTasks = response;
      console.log('all tasks', res.locals.allTasks);
      return next();
    } catch (err) {
      return next({
        log: `An error occurred in getTasks ${err}`,
        message: { err: 'An error occurred, check server for more details' },
      });
    }
  },

  deleteTask: async (req, res, next) => {
    try {
      console.log('req.params', req.params.id);
      await List.deleteOne({ _id: req.params.id });
      return next();
    } catch (err) {
      return next({
        log: `An error occurred in deleteTask ${err}`,
        message: { err: 'An error occurred, check server for more details' },
      });
    }
  },
};
