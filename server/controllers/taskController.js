const db = require('../models/TaskModel');

const taskController = {};


taskController.postTask = (req, res, next) => {
  console.log(req.params)
  const { task } = req.params;
  console.log(task);

  const queryString = `
  INSERT INTO task (item)
  VALUES ($1);
  `;
  const queryValues = [task];

  db.query(queryString, queryValues)
    .then(response => {
      console.log(response);
      if (response) {
        res.locals.newtask = response;
        return next();
      }
      else {
        return next({ message: 'sent back empty response??? - postTask'})
      }
    })
    .catch(err => {
      console.log(err);
      return next({
        log: 'Problem happened in postTask in taskController',
        message: 'postTask in taskController had issue => ', err
      })
    })
}

taskController.getTasks = (req, res, next) => {

  const queryString = `
  SELECT * FROM Task
  `;
  
  db.query(queryString)
    .then(response => {
      console.log(response.rows);
      if (response) {
        res.locals.tasks = response.rows;
        return next();
      } else {
        return next({ message: 'sent back empty response??? - getTasks'})
      }
    })
    .catch(err => {
      console.log(err);
      return next({
        log: 'Problem happened in getTasks in taskController',
        message: 'getTasks in taskController had issue => ', err
      })
    })
}

taskController.deleteTask = (req, res, next) => {
  const { task } = req.params;
  
  const queryString = `
  DELETE FROM task
  WHERE item = $1;
  `;
  const queryValues = [task];

  db.query(queryString, queryValues)
    .then(response => {
      console.log(response);
      if (response) {
        res.locals.removed = response;
        return next();
      } else {
        return next({ message: 'sent back empty response??? - deleteTask'})
      }
    })
    .catch(err => {
      console.log(err);
      return next({
        log: 'Problem happened in deleteTask in taskController',
        message: 'deleteTask in taskController had issue => ', err
      })
    })
}

module.exports = taskController;