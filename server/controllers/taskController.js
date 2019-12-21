
 const Task = require('../models/TaskModel');
 const taskController = {};

//CREATE
taskController.createTask = (req, res, next) => {
  const item  = req.body.item;
  Task.create({
    item
  },(err,task) => {
    if(err){
      return next(err)
    }
  })
    res.locals.item = task;
    return next();
}

//  READ
taskController.getAllTasks = (req, res, next) => {
  Task.find({}).exec()
  .then(taskDocs => {
      res.locals.tasks = taskDocs;
      next();
  })
  .catch(err => {
    next({
      log:`taskController:getTasks ERROR IS %{err}`,
      message: { err: `Error in task controller` }
    });
  });
}


//DELETE
Task.deleteMessage = (req,res,next)=> {
    Task.findByIdAndRemove(req.params.itemId,(err,message) => {
      const response = {
        message: "Successfull deletion",
        id: req.params
      };
      return res.status(200).send(response);
    });
}


module.exports = taskController; 