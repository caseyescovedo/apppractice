const Tasks = require('../models/TaskModel.js');

const taskController = {};

taskController.postTask = (req, res, next) => {
  Tasks.create({
    item: req.body,
  })
    .then(() => next())
    .catch((err) => next(err));
};

taskController.getTasks = (req, res, next) => {
  Tasks.find({})
    .exec()
    .then((data) => {
      res.locals.data = data;
      next();
    })
    .catch((err) => next(err));
};

taskController.deleteTask = (req, res, next) => {
  const { id } = req.params;
  Tasks.findByIdAndDelete(id)
    .exec()
    .then(() => {
      console.log(`item deleted!`);
      next();
    })
    .catch((err) => next(err));
};

taskController.module.exports = taskController;
