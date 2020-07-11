const Task = require('../models/TaskModel');

const taskController = {};

taskController.createTask = async (req, res, next) => {
  const taskObj = req.body;
  //Insert Validation logic here if time

  const dbTask = new Task(taskObj);
  await dbTask.save();

  res.locals.task = dbTask;
  return; //Async Wrapper calls next
};

taskController.getTasks = async (req, res, next) => {
  const tasksArr = await Task.find();
  res.locals.tasks = tasksArr;
  return; // Async Wrapper calls next
};

taskController.removeTask = async (req, res, next) => {
  const taskObj = await Task.findByIdAndDelete(req.params.id);

  if (!taskObj) throw { status: 404, message: 'Task not in Database' };

  res.locals.task = taskObj;
  return; // Async wrapper calls next
};

module.exports = taskController;
