const db = require('../models/TaskModel.js');

const taskController = {};

taskController.getAllTasks = (req, res, next) => {
  const queryString = 'SELECT * FROM todolist';
  db.query(queryString, (err, response) => {
    if (err) {
      return next({
        log: 'Error in getAllTasks middleware',
        status: 400,
        message: { err },
      });
    }
    res.locals.getAllTasks = response.rows;
    return next();
  });
};

taskController.addTask = (req, res, next) => {
  const { task } = req.body;
  const taskArr = [task];
  const queryString = 'INSERT INTO todolist (task) VALUES ($1)';
  db.query(queryString, taskArr, (err) => {
    if (err) {
      return next({
        log: 'Error in addTask middleware',
        status: 400,
        message: { err },
      });
    }
    return next();
  });
};

taskController.deleteTask = (req, res, next) => {
  const { id } = req.body;
  const idArr = [id];
  const queryString = 'DELETE FROM todolist WHERE id=$1';
  db.query(queryString, idArr, (err) => {
    if (err) {
      return next({
        log: 'Error in deleteTask middleware',
        status: 400,
        message: { err },
      });
    }
    return next();
  });
};


module.exports = taskController;
