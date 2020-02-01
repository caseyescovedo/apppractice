/* eslint-disable no-console */
const db = require('../models/TaskModel.js');

const taskController = {};

taskController.getTasks = (req, res, next) => {
  const queryString = 'SELECT * FROM task';
  db.query(queryString, (err, response) => {
    if (err) {
      const errMessage = `Error creating task: ${err}`;
      console.log(errMessage);
      return errMessage;
    }
    res.locals.tasks = response.rows;
    return next();
  });
};

taskController.postTask = (req, res, next) => {
  const { item } = req.body;
  const array = [item];
  const queryString = 'INSERT INTO task (item) VALUES ($1)';
  db.query(queryString, array, (err) => {
    if (err) {
      const errMessage = `Error creating task: ${err}`;
      console.log(errMessage);
      return errMessage;
    }
    return next();
  });
};

taskController.deleteTask = (req, res, next) => {
  const { id } = req.body;
  const array = [id];
  const queryString = 'DELETE FROM task WHERE id = $1';
  db.query(queryString, array, (err) => {
    if (err) {
      const errMessage = `Error deleting task: ${err}`;
      console.log(errMessage);
      return errMessage;
    }
    return next();
  });
};

module.exports = taskController;
