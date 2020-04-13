const Task = require("../models/TaskModel");

const taskController = {};

taskController.postTask = (req, res, next) => {
  Task.create(
    {
      item: req.body.item,
    },
    (err, item) => {
      if (err) {
        console.log("Error in postTask");
        res.sendStatus(418);
      } else {
        res.locals.item = item;
        return next();
      }
    }
  );
};

taskController.getTasks = (req, res, next) => {
  Task.find({}, (err, items) => {
    // console.log(items);
    if (err) {
      console.log("Error in getTasks");
      return error;
    } else {
      res.locals.item = items;
      console.log(res.locals.item);
      return next();
    }
  });
};

taskController.deleteTask = (req, res, next) => {
  const { _id } = req.body;
  Task.deleteOne({ _id: _id }, (err, deletedItem) => {
    if (err) {
      return next(`Inside deleteTask controller: ${err}`);
    }
    return next();
  });
};

module.exports = taskController;
