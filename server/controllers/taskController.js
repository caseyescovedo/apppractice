const { Task } = require('../models/TaskModel');

const postTask = async (req, res, next) => {
  try {
    const newTask = {
      item: req.body.item,
    };
    await new Task(newTask).save();

    return next();
  } catch (err) {
    console.log(err.message);
  }
};

const getTasks = async (req, res, next) => {
  try {
    const allTasks = await Task.find();
    res.locals.tasks = allTasks;
    return next();
  } catch (err) {
    console.log(err.message);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    await Task.deleteOne({ _id: req.params.taskId });
    return next();
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { postTask, getTasks, deleteTask };
