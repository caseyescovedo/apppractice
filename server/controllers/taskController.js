const { Task } = require("../models/TaskModel.js");
const taskController = {};

taskController.postTask = (req, res, next) => {
  const timeCreated = new Date();
  Task.create({ task: req.body.task, created_at: timeCreated }, (err, task) => {
    if (err) {
      console.log("there was an error adding task to db");
      return next({ error: "error adding task to db" });
    } else {
      return next();
    }
  });
};
//get ALL tasks and return JSON
taskController.getTasks = (req, res, next) => {

  Task.find({}, (err, tasks) => {
    if (err) {
      console.log('there was an error getting task from db')
      return next({error: 'error getting task from db'})
    } else {
      res.json(tasks)
      return next();
    }
  })
};


taskController.deleteTask = (req, res, next) => {
  Task.findOneAndDelete(
    { task: req.body.task },
    (err, task) => {
      if (err) {
        console.log("there was an error deleting task from db");
        return next({ error: "error removing task from db" });
      } else {
        console.log('task deleted from db :', task)
        return next();
      }
    }
  );
};

module.exports = {
  taskController,
};
