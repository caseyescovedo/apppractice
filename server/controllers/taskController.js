const models = require("../models/TaskModel");

const taskController = {};

taskController.getTasks = (req, res, next) => {
  models.Task.find({}, function(err, result) {
    if (err) next(err);
    res.locals.tasks = result;
    return next();
  });
};

taskController.postTask = (req, res, next) => {
  console.log(req.body);
  const { item, created_at } = req.body;
  console.log("created_at is a", typeof created_at);
  models.Task.create({ item, created_at })
    .then(result => {
      res.locals.tasks = result;
      console.log("task was saved as: ", result);
      next();
    })
    .catch(err => {
      next({
        log: `taskController.postTask: ERROR: ${err}`,
        message: {
          err:
            "Error occurred in taskController.postTask. Check server logs for more details."
        }
      });
    });
};

taskController.deleteTask = (req, res, next) => {
  console.log("inside delete task");
  let id = req.params.id;
  models.Task.remove({ id }, (err, result) => {
    if (err)
      return next("Error in taskController.deleteTask: " + JSON.stringify(err));
    res.locals.task = task;
    return next();
  });
};

module.exports = taskController;
