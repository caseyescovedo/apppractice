const Task = require('../models/TaskModel.js');
const taskController = {};

taskController.postTask = (req, res, next) => {
  console.log(req.body);
  const newTask = new Task({ item: req.body.item });
  newTask
    .save()
    .then((newDoc) => (res.locals.newDoc = newDoc))
    .catch((err) => console.log(err));

  next();
};

taskController.getTasks = (req, res, next) => {
  Task.find()
    .then((allDocs) => res.json(allDocs))
    .catch((err) => console.log(err));
  next();
};

taskController.deleteTask = (req, res, next) => {
  const taskToDelete = req.body;
  Task.deleteOne(taskToDelete, function (err) {
    if (err) console.log(err);
  }).then(() => res.sendStatus(200));
  next();
};

module.exports = taskController;
