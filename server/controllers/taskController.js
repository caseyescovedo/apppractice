const Task = require('../models/TaskModel');

module.exports = {

  postTask: function(req, res, next) {
    Task.create({ item: req.body.task }, (err, result) => {
      if (err) return console.log('err in postTask: ', err);
      res.locals.task = result;
      return next();
    });
  },

  getTasks: function(req, res, next) {
    Task.find({}, (err, result) => {
      if (err) return console.log('err in getTasks: ', err);
      res.locals.allTasks = result;
      return next();
    });
  },

  deleteTask: function(req, res, next) {
    const { id } = req.params;
    Task.findOneAndDelete({ _id: id }, (err, result) => {
      if (err) return console.log('err in deleteTask: ', err);
      res.locals.deletedTask = result;
      return next();
    });
  },

};
