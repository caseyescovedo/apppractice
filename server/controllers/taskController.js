const Task = require('../models/TaskModel');

const taskController = {};

taskController.postTask = async (req, res, next) => {
  try {
    console.log(req.body);
    const dbResponse = await Task.create(req.body);
    res.locals.dbResponse = dbResponse;
    return next();
    // res.status(200).send(dbResponse);
  } catch (error) {
    return next({
      ...error,
      message: 'Problem in the postTask controller',
    });
  }
};

taskController.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({});
    res.locals.tasks = tasks;
    return next();
  } catch (error) {
    return next({
      ...error,
      message: 'Problem in the getTask controller',
    });
  }
};

taskController.deleteTask = async (req, res, next) => {
  try {
    const { _id } = res.locals;
    const deleted = await Task.deleteOne({ _id });
    res.locals.deleted = deleted;
    return next();
  } catch (error) {
    return next({
      ...error,
      message: 'Problem in the deleteTask controller',
    });
  }
};

module.exports = taskController;
