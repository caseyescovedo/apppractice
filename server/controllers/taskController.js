const Task = require('../models/TaskModel');

const taskController = {};

taskController.postTask = (req, res, next) => {
  Task.create(req.body, (err, task) => {
    if (err) return res.sendStatus(404);
    return res.status(200).json(task);
  });
};

taskController.getTasks = (req, res, next) => {
  Task.find({}, (err, tasks) => {
    if (err) return res.sendStatus(404);
    return res.status(200).send(tasks);
  });
};

taskController.deleteTask = (req, res, next) => {
  const id = req.params.id;

  Task.findOneAndDelete(
    { id },
    (err, task) => {
      if (err) return res.sendStatus(404);
      return res.sendStatus(200);
    }
  );
};

module.exports = taskController;
// module.exports = {
// 
// 
// };
