const Task = require("../models/TaskModel");
const taskController = {};

// retrive item string from the request body and save it to the database, them respond with the id created on the databas 
taskController.postTask = (req, res, next) => {
  const { item } = req.body;
  Task.create({item})
  .then(data => {
    res.locals.data = {
      _id: data._id,
      item: data.item,
    };
    return next();
  })
  .catch(err => {
    console.log('an error has occurred in taskController.postTask');
    return next(err);
  })
}

// retrive all content of database, them respond with an object containg the order of insertion on the database as keys and the task objects as values
taskController.getTask = (req, res, next) => {
  Task.find({}).exec()
    .then(data => {
      res.locals.data = data;
      return next();
    })
    .catch(err => {
      console.log('an error has occurred in taskController.getTask');
      return next(err);
    });
};

// retrive task id from the request params and search it on the database and delete, them respond with an object containg all the history about the deleted task.
taskController.deleteTask = (req, res, next) => {
  const _id = req.params.id;
  Task.findOneAndDelete({ _id }).exec()
  .then(data => {
    res.locals.data = data;
    return next();
  })
  .catch(err => {
    console.log('an error has occurred in taskController.deleteTask');
    return next(err);
  })
}

module.exports = taskController;
