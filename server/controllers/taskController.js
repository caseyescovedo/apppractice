const Task = require("../models/TaskModel");

function postTask(req, res, next) {
  console.log("post task is running correctly.");
  const { item, created_at } = req.body;

  Task.create({ item, created_at })
    .then(taskItem => {
      console.log(taskItem);
      res.locals.taskItem = taskItem;
      return next();
    })
    .catch(err => next({ err: "testing err message post task" }));
}

function getTasks(req, res, next) {
  Task.find({})
    .then(tasks => {
      console.log(tasks);
      res.locals.tasks = tasks;
      return next();
    })
    .catch(err => next(err));
}

function deleteTask(req, res, next) {
  const { id } = req.body;
  console.log('id of deleted element', id)

  Task.findByIdAndDelete(id)
    .then(taskItem => {
      console.log(taskItem);
      res.locals.taskItem = taskItem;
      return next();
    })
    .catch(err => next(err));
}

module.exports = {
  postTask,
  getTasks,
  deleteTask
};
