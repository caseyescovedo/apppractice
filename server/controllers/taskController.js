const Task = require('../models/TaskModel')

const taskController = {}

// middleware to post task
taskController.postTask = (req, res, next) => {
  // grab    from body of request 
  const { item } = req.body;
  // create new task and save it to db
  Task.create({ item })
  // assign new task to param and store it on res.locals object
    .then(taskBody => {
      res.locals.data = taskBody;
      next()
    })
    .catch(err => next(err));
}

// middleware to get tasks
taskController.getTasks = (req, res, next) => {
  // use find to query object of tasks from db
  // store on res.locals and return as promise
  Task.find().exec()
    .then(taskBody => {
      res.locals.data = taskBody;
      next()
  })
    .catch(err => next(err));
}

// middleware to delete tasks
taskController.deleteTask = (req, res, next) => {
  // look up task in db by id stored in request param
  // store on res.locals and return as promise
  Task.findByIdAndDelete(req.params.id).exec()
  .then(taskDocs => {
    res.locals.data = taskDocs;
    next()
  })
  .catch(err => next(err));
}



module.exports = taskController
