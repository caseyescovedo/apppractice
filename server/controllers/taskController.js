const { Task } = require('../models/TaskModel.js')
const taskController = {};

taskController.postTask = (req, res, next) => {
  const timeCreated = new Date();
  Task.create({task: req.body.task, created_at: timeCreated}, (err, task) => {
    if (err) {
      console.log('there was an error adding task to db')
      return next({error: 'error adding task to db'})
    } else {
      return next();
    }
  })
}
//get ALL taks and return JSON
taskController.getTasks = (req, res, next) => {
  Task.find({}, (err, task) => {
    if (err) {
      console.log('there was an error getting task from db')
      return next({error: 'error getting task from db'})
    } else {
      return next();
    }
  })
}
//not finished
taskController.deleteTask = (req, res, next) => {
  Task.findOneAndDelete({task: req.body.task, created_at: timeCreated}, (err, task) => {
    if (err) {
      console.log('there was an error deleting task from db')
      return next({error: 'error removing task from db'})
    } else {
      return next();
    }
  })
}





module.exports = {
taskController
};
