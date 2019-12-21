
 const Task = require('../models/TaskModel');
 const taskController = {};


//CREATE
taskController.postTask = (req, res, next) => {
  const item  = req.body.item;
 
  Task.create({
    item
  })
  .then(taskDoc => {
    res.locals.item = taskDoc.item;

    return next();
  })
  .catch(err => {
    next({
    log: `taskController.postTask: ERROR: ${err}`,
    message: { err: 'Error in taskController post, check logs'}
  });
});
}

//  READ
taskController.getTasks = (req, res, next) => {
  Task.find({}).execc()
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