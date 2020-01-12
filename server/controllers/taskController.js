const ToDo = require("../models/TaskModel");

const taskController = {};

// add tasks
taskController.postTask = (req, res, next) => {
  const { item } = req.body;
  ToDo.create({ item })
    .then(item => {
      //   console.log("items in addTask controller", item);
      res.locals.item = item;
      return next();
    })
    .catch(err => console.log(err));
};

// get tasks
taskController.getTasks = (req, res, next) => {
  ToDo.find({})
    .exec()
    .then(items => {
      //   console.log("items in getTasks controller", items);
      res.locals.items = items;
      return next();
    })
    .catch(err => console.log(err));
};

// delete task
taskController.deleteTask = (req, res, next) => {
  console.log("logging req.params in delete controller", req.params);
  ToDo.findOneAndDelete({ _id: req.params._id }, (err, delItem) => {
    if (err) return res.sendStatus(404);
    res.locals.item = delItem;
    return next();
  }).catch(err => console.log(err));
};

module.exports = taskController;
