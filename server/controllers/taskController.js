const Task = require('../models/TaskModel');

module.exports = {

  postTask: (req, res, next) => {
    const { item } = req.body;
    console.log(req.body);
    Task.create({ item }, (err, document) => {
      if (err) {
        return next(err);
      }
      res.locals.task = document;
      return next();
    });
  },

  getTasks: (req, res, next) => {
    Task.find({}, (err, documents) => {
      if (err) {
        return next(err);
      }
      res.locals.found = documents;
      return next();
    });
  },

  deleteTask: (req, res, next) => {
    const { id } = req.body;
    Task.findByIdAndDelete(id, (err, document) => {
      if (err) {
        return next(err);
      }
      return next();
    });
  },
};
