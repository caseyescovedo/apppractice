const db = require("../models/TaskModel");

const taskController = {};

taskController.postTask = function(req, res, next) {
  const { task } = res.body;

  const arr = [task];

  const queryString = "INSERT INTO ToDo (task, item) VALUES ($1, $2)";
  db.query(queryString, arr, err => {
    if (err) {
      return next({
        log: "error from postTask",
        message: { err }
      });
    }
    return next();
  });
};

taskController.getTasks = function(req, res, next) {
  const queryString = "SELECT * FROM ToDo";
  db.query(queryString, (err, response) => {
    if (err) {
      return next({
        log: "error from getTask",
        message: { err }
      });
    } else {
      console.log("all tasks", response.rows);
      res.locals.allTasks = response.rows;
      return next();
    }
  });
};

taskController.deleteTask = function(req, res) {
  const { id } = req.body;
  const arr = [id];
  const queryString = "DELETE FROM ToDo WHERE id=$1";
  if (err) {
    return next({
      log: "error from deleteTask",
      message: { err }
    });
  }
  return next();
};

module.exports = taskController;
