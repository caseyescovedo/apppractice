const Task = require('../models/TaskModel');

const taskController = {};

// Function `postTask` should create a new item in the database
taskController.postTask = (req, res, next) => {
  const { task } = req.body;
  Task.create({ 'item': task }, (err, result) => {
    if (err) {
      return next({
        log: 'Error creating task in taskController.postTask middleware',
        message: {err:'Error creating task'}
      })
    } else {
      console.log('something is being created')
      console.log(result)
      res.locals.item = result;
      return next();
      }
    }
  )
}

// Function `getTasks` should retrieve all items from the database and send it back to the client as JSON

taskController.getTasks = (req, res, next) => {
  console.log('in getTasks')
  Task.find({}, (err, result) => {
    if (err) {
      return next({
        log: 'Error getting tasks in taskController.getTask middleware',
        message: {err:'Error getting tasks'}
      })
    } else {
      console.log('tasks being fetched')
      console.log(result)
      res.locals.tasks = result;
      return next();
      }
    }
  )
}


// Function `deleteTask` should find items in the database based on an ID number and delete that item if it exists

taskController.deleteTask = (req, res, next) => {
  const { id } = req.body;
  Task.deleteOne({'_id': id}, (err, result) => {
    if (err) {
      return next({
        log: 'Error deleting task in taskController.deleteTask middleware',
        message: {err:'Error deleting task'}
      })
    } else {
      console.log('task was deleted, hopefully')
      return next();
      }
    }
  )
}





module.exports = taskController;