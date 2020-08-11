const Task = require('../models/TaskModel');

const taskController = {};

taskController.getTask = (req, res, next) => {
  Task.find({})
    .then((data) => {
      console.log(data); // this is the array of tasks
      res.locals.tasks = data;
      return next();
    })
    .catch((err) => {
      console.log('err in getTask controller');
      return next(err);
    });
};

taskController.postTask = (req, res, next) => {
  const { item } = req.body;
  console.log(item);
  if (!item) {
    return res.status(400).send('task field cannot be empty');
  }
  return Task.create({ item })
    .then((data) => {
      console.log('task created: ', data); // this is the document aka obj created
      res.locals.task = data;
      return next();
    })
    .catch((err) => {
      console.log('err in postTask controller');
      return next(err);
    });
};

taskController.deleteTask = (req, res, next) => {
  console.log('delete request arrived at delete controller');
  const { id } = req.params;
  Task.findOneAndDelete({ _id: id })
    .then((docDeleted) => {
      console.log('document deleted: ', docDeleted);
      res.locals.deleted = docDeleted;
      return next();
    })
    .catch((err) => {
      console.log('err in deleteTask controller');
      return next(err);
    })
};


module.exports = taskController;
