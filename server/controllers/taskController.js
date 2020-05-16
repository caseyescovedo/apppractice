const Task = require('../models/TaskModel');

const TaskController = {};

TaskController.postTask = (req, res, next) => {
  const { item } = req.body;
  Task.create(item, (err, newItem) => {
    if(err) return next(err);
    res.locals.newItem = newItem;
    return next();
  })
}

TaskController.getTasks = (req, res, next) => {
  const { item } = req.body;
  Task.findOne((item), (err, oneItem) => {
    if (err) return next(err);
    res.locals.oneItem = oneItem;
    return next();
  })
}

TaskController.deleteTask = (req, res, next) => {
  const { item } = req.body;
  Task.deleteOne(item, (err, deletedItem) => {
      if (err) return next(err);
      res.status(200).send('Successful delete');
      return next();
  })
}

module.exports = TaskController;
