// const models = require('../models/TaskModel');
const { Tasks } = require('../models/TaskModel');

const taskController = {};

taskController.getTasks = (req, res, next) => {
  Tasks.find({}, (err, docs) => {
    if (err) {
      res.status(500);
    }
    // console.log('latest task: ', docs);
    res.locals.tasks = docs;

    next();
  });
};

taskController.postTasks = (req, res, next) => {
  console.log(req.body);
  const newTask = req.body;
  Tasks.create(newTask, (err, docs) => {
    if (err) {
      res.status(500);
    }
    console.log('latest task: ', docs);
    res.locals.task = docs;

    next();
  });
};

taskController.deleteTasks = (req, res, next) => {
  Tasks.find({}, (err, docs) => {
    if (err) {
      res.status(500);
    }
    console.log('latest task: ', docs);
    res.locals.tasks = docs;

    next();
  });
};

module.exports = taskController;
console.log(taskController);
