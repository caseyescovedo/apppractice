const mongoose = require('mongoose');
const { Task } = require('../models/TaskModel');

module.exports = {
  postTask: (req, res, next) => {
    const { item } = req.body;

    Task.create({ item }, (err, data) => {
      if (err) return next({ err });

      res.locals.created = data;
      return next();
    });
  },

  getTasks: (req, res, next) => {
    Task.find({}, (err, data) => {
      if (err) return next({ err });
      res.locals.tasks = data;
      return next();
    });
  },

  deleteTask: (req, res, next) => {
    const { id } = req.body;

    Task.findOneAndDelete({ _id: id }, (err, data) => {
      if (err) return next({ err });
      return next();
    });
  },
};
