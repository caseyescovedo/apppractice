const Task = require('../models/TaskModel.js')

module.exports = {
  postTask: async (req, res, next) => {
    const { item } = req.body;
    try {
      const task = await Task.create({ item })
      res.locals.data = task;
      return next();
    } catch (err) {
      return next(err);
    }
  },
  getTasks: async (req, res, next) => {
    try{
      const tasks = await Task.find({}).exec();
      res.locals.data = tasks;
      return next();
    } catch (err) {
      return next(err);
    }
  },
  deleteTask: async (req, res, next) => {
    const { id } = req.params;
    try{
      const deleted = await Task.findByIdAndDelete(id).exec();
      res.locals.data = deleted;
      console.log(deleted);
      return next();
    } catch (err) {
      return next(err);
    }
  }
};
