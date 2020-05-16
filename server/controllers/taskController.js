const Task = require('../models/TaskModel');

const getTasks = async (req, res, next) => {
  try {
    const taskList = await Task.findAll();
    res.status(200).json({ tasks: taskList});
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const postTask = async (req, res, next) => {
  if (!req.body.item) return next("Task must have item information");
  try {
    const newTask = await Task.create({
      item: req.body.item,
    })
    res.status(200).json({
      message: 'Task created successfully',
      task: newTask,
    })
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const deleted = await Task.destroy({
      where: {
        id: req.params.id,
      }
    })
    if (!deleted) {
      res.status(400).send('No task found');
    }
    res.status(200).json({
      message: 'Task deleted',
      deletedId: deleted,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

module.exports = {
  getTasks,
  postTask,
  deleteTask,
};
