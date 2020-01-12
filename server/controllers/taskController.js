const Task = require('../models/TaskModel');


const taskController = {};

taskController.getAll = (req, res, next) => {
  Task.find({})
      .then(tasks => {
        res.locals.tasks = tasks;
        return next();
  })
      .catch(e => {
        return next(e);
  })
};

//todo: I would probably need to send the id too;
taskController.addTask = (req, res, next) => {
  console.log(req.body);
  const {item} = req.body;
  console.log(item);
  Task.create({
    item
  })
  .then(result => {
    res.locals.addResult = result;
    return next();
  })
  .catch(e => next(e));
};

taskController.deleteTask = async (req, res, next) => {
  console.log(req.body);
  const {item, id} = await req.body;
  console.log(item,  id);
  Task.remove({id, item})
  .then(result => {
    res.locals.deleteResult = result;
    return next();
  })
  .catch(e => next(e));
};

module.exports = taskController;
