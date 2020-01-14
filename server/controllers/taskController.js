const Task = require('../models/TaskModel');

const TasksController = {};


TasksController.postTask = (req, res, next) => {
  const { item } = req.body
  Task.create({ item })
    .then(item => {
      res.locals.task = item;
      console.log('new task added')
      return next();
    })
    .catch(err => console.log(err))
}

TasksController.getTasks = (req, res, next) => {
  Task.find({})
    .exec()
    .then(tasks => {
      res.locals.getTasks = tasks
      return next()
    })
    .catch(err => console.log(err))
}

TasksController.deleteTask = (req, res, next) => {
  console.log(req.params.id)
  Task.findOneAndDelete({ _id: req.params.id }, (err, deletedTask) => {
    if (err) return res.sendStatus(418);
    res.locals.task = deletedTask;
    return next();
  })
}


module.exports = TasksController;
