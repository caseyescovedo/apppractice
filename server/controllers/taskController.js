const Tasks = require('../models/TaskModel.js');

const taskController = {};

taskController.postTask = (req, res, next) => {
  const { item } = req.body;
  Tasks.create({
    item,
  })
    .then((data) => {
      next();
    })
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
  console.log('*** Task Controller **', id);
  Tasks.findByIdAndDelete(id)
    .exec()
    .then(() => {
      console.log(`item deleted!`);
      next();
    })
    .catch((err) => next(err));
};

module.exports = taskController;
