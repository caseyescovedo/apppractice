const Task = require("../models/TaskModel");
const taskController = {};

taskController.postTask = (req, res, next) => {
  const { task } = req.body;
  Task.create(
    {
      task,
    },
    (err, data) => {
      if (err) {
        console.log(`Error inside of .postTask controller: ERR: ${err}`);
        return next();
      } else if (data) {
        res.locals.task = task;
        return next();
      }
    }
  );
};

taskController.getTasks = (req, res, next) => {
  Task.find({}, (err, data) => {
    if (err) {
      console.log(`Error inside .getTasks controller: Err: ${err}`);
      return next();
    } else if (data) {
      let taskArr = [];
      data.forEach((task) => {
        taskArr.push(task);
      });
      res.locals.tasks = taskArr;
      return next();
    }
  });
};

taskController.deleteTask = (req, res, next) => {
  const { id } = req.body;

  Task.findByIdAndDelete(
    {
      _id: id,
    },
    (err, data) => {
      if (err) {
        console.log(`Error inside of .deleteTask Controller: Err: ${err}`);
        return next();
      } else if (data) {
        res.locals.response = data;
        return next();
      }
    }
  );
};

module.exports = taskController;
