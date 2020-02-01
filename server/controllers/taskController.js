const pool = require("../models/TaskModel.js");
const taskController = {};

taskController.postTask = function(req, res, next) {
  const { item } = req.body;
  const values = [item];
  const text = "INSERT INTO task (item) VALUES($1) ";
  const postQuery = {
    text,
    values
  };
  pool.query(postQuery, (err, data) => {
    if (err) {
      return next(err);
    } else {
      return next();
    }
  });
};
taskController.getTasks = function(req, res, next) {
  const text = "SELECT id,item FROM task";
  const getQuery = {
    text
  };
  pool.query(getQuery, (err, data) => {
    if (err) {
      return next(err);
    } else {
      res.locals.items = data.rows;
      return next();
    }
  });
};
taskController.deleteTasks = function(req, res, next) {
  const { id } = req.body;
  const values = [Number(id)]; //the id should be coming back as a number       instead of a string anyways but this is just in case
  const text = "DELETE FROM task WHERE id=$1 ";
  const delQuery = {
    text,
    values
  };
  pool.query(delQuery, (err, data) => {
    if (err) {
      return next(err);
    } else {
      return next();
    }
  });
};
module.exports = taskController;
