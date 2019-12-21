const Task = require('../models/TaskModel');

module.exports = {

  // post task to create one new item in the db
  postTask(req, res, next) {
    const { item } = req.body;
    Task.create({ item }, (err, task) => {
      if(err) {
        return next (err);
      }
      res.locals.task = task;
      return next();
    });
  },

  // get all the tasks in the db
  getTasks(req, res, next) {
    Task.find({}, (err, tasks) => {
      console.log(tasks);
      if(err) {
        return next(err);
      }
      else {
        res.locals.tasks = tasks;
        return next();
      }
    });
  },
  
  // delete one task in the db
  deleteTask(req, res, next) {
    let id = req.params.id;
    Task.findOneAndRemove({ _id: id}, (err, deletedTask) => {
      if(err) return next(err);
      else {
        res.locals.deletedTask = deletedTask;
        return next();
      }
    });
  }

};
