//Require task models
const models = require('../models/TaskModel.js')

const taskController = {};

// ======================================================
// ============ CRUD Middleware Functions ===============
// ======================================================

// create a new task
taskController.postTask = (req, res, next) => {
  const item = req.body.task
  console.log(req.body)
  // console.log('req.body.task in taskController.js:', task);
  models.create({ item })
    .then(createdTask => {
      res.locals.data = createdTask;
      next();
    })
    .catch(err => next('Error in taskController.postTask: ', err))
}

// retrieve all tasks
taskController.getTasks = (req, res, next) => {
  models.find().exec()
    .then(retrievedTasks => {
      res.locals.data = retrievedTasks;
      next();
    })
    .catch(err => next('Error in taskController.getTasks: ', err))
}

// delete a task
taskController.deleteTask = (req, res, next) => {
  // console.log('req.params in taskController.deleteTask: ', req.params);
  models.findOneAndDelete(req.params.id).exec()
    .then(deletedTask => {
      res.locals.data = deletedTask;
      console.log(`Task with ID ${deleteTask} has been deleted from the database.`);
      next();
    })
    .catch(err => next('Error in taskController.deleteTask: ', err))
}

// ======================================================
// ========= Exporting taskController ===================
// ======================================================

module.exports = taskController
