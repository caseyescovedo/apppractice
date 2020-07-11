const Task = require('../models/TaskModel');

const taskController = {};

taskController.postTask = async (req, res, next) => {
  const { item } = req.body;
  try {
    await Task.create({ item });
    return next();
  } catch (err) {
    return next(err);
  }
};

taskController.getTasks = async (req, res, next) => {
  try {
    await Task.find({});
    return next();
  } catch (err) {
    return next(err);
  }
};

taskController.deleteTask = async (req, res, next) => {
  const { id } = req.body;
  try {
    const task = await Task.findById(id);
    if (!task) {
      return next(`Task not found with id of ${id}`);
    }

    task.remove();
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = taskController;
