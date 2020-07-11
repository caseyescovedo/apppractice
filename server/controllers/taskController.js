const mongoose = require('mongoose');
const Task = require('../models/TaskModel');

const postTask = (req, res, next) => {
    const { item } = req.body;

    if (
      !item || typeof item !== 'string'
    ) {
      return next({
        message:
          'taskController.postTask: not a valid task',
      });
    }
  
    const task = new Task({ item, created_at: new Date() });
  
    task.save(function (err, task) {
      if (err) {
        return next({
            message:
              'taskController.postTask: error on creating the task',
          });
      }
      //console.log('save succesful', user.id);
      res.locals.task = task;
      next();
    });
}


const  getTasks  = (req, res, next) => {
    Task.find({}, (err, tasks) => {
        // if a database error occurs, call next with the error message passed in
        // for the express global error handler to catch
        if (err)
          return next(
            'Error in taskController.getTasks: ' + JSON.stringify(err)
          );
    
        // store retrieved users into res.locals and move on to next middleware
        res.locals.tasks = tasks;
        return next();
      });
}

const deleteTask = (req, res, next) => {
  const id = req.params.id;
  console.log("performing delete for task:",id);
  let mongodbId = mongoose.Types.ObjectId(id);
  /* 
  Task.deleteById(mongodbId, function (err, task) {    
    if (err) {
      console.log("error:", err);
      return next(
        'Error in taskController.deleteTask: ' + JSON.stringify(err)
      );
    }
    console.log(task);
    next();
  });
  */
  
  Task.findOneAndDelete({ _id: mongodbId }, function (err, task) {    
    if (err) {
      console.log("error:", err);
      return next(
        'Error in taskController.deleteTask: ' + JSON.stringify(err)
      );
    }
    console.log(task);
    next();
  });
  
}

module.exports = { 
  postTask,
  getTasks,
  deleteTask,
};
