//importing schema
const Tasks = require('../models/TaskModel');

//controller that will have all methods
const taskControler = {};

//create/post a task 
taskControler.createTask = (req, res, next) => {
  const { item } = req.body;
  Tasks.create({
    item: item,
  })
  .then((dbData) => {
    res.locals.newTask = dbData
    return next(); 
  })
  .catch((err) => console.log(err));
}


//get all tasks 
taskControler.getAllTasks = (req, res, next) => {
  Tasks.find()
  .then((dbData) => {
    res.locals.allTasks = dbData
    return next(); 
  })
  .catch((err) => console.log(err))
}


//delete a task by ID
taskControler.deleteTask = (req, res, next) => {
  const { id } = req.params;
  Tasks.deleteOne({
    _id : id,
  })
  .then(() => {
    return next()
  })
  .catch((err) => console.log(err))
}



module.exports = taskControler;
