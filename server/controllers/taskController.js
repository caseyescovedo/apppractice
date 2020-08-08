const Task = require('../models/TaskModel');

module.exports = {
  postTask: (req, res, next) => {
    // grab the task and add to db
    const { task } = req.body;
    Task.create({ item: task })
      .then((data) => {
        console.log('successfully created task');
        res.data = data;
        return next();
      })
      .catch((err) => {
        next({ err: `err at postTask: ${err}` });
      });
  },
  getTask: (req, res, next) => {
    Task.find({})
      .then((data) => {
        res.data = data;
        return next();
      })
      .catch((err) => {
        return next({ err: `err at getTask: ${err}` });
      });
  },
  deleteTask: (req, res, next) => {
    const { id } = req.params;
    Task.findByIdAndDelete(id)
      .then((result) => {
        return next();
      })
      .catch((err) => {
        return next({ err: `err at deleteTask: ${err}` });
      });
  },
};
