const models = require('../models/TaskModel.js');

const taskController = {};

// postTask --------------------------------------------------
taskController.postTask = (req, res, next) => {
  models.Task.create({
    item: req.body.item,
  })
  .then(data => {
    console.log(data)
    res.locals.task = data;
    next();
  })
}

// getTasks --------------------------------------------------
taskController.getTasks = (req, res, next) => {
  // finds all tasks
  models.Task.find()
  console.log('getTasks')
  .then(data => {
    res.locals.allTasks = data;
    next();
  })
}

// deleteTask ------------------------------------------------
taskController.deleteTask = (req, res, next) => {
  // req.query and req.params
  // console.log('Req.Query.id:', req.query.id)

  // finds all tasks
  models.Task.findOneAndDelete({
    "id": req.body.id,
  })
  .exec().then( next() )
}

module.exports = taskController;
