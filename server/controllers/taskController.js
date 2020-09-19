const db = require('../models/TaskModel');

const taskController = {};

taskController.postTask = (req, res, next) => {
  // use destructuring to pull item out of request body
  const { item } = req.body;
  // define query string to insert item into tasks table
  const string = `
  INSERT INTO tasks(item)
  VALUES ($1)
  returning *;
  `;
  // put item into array to easily inject it into query string using bang operator
  const values = [item];
  // query database with string and array of values
  db.query(string, values)
    // store returned array in res.locals
    .then((response) => {
      res.locals.responst = response.rows;
      return next();
    })
    // if there's an error, throw err
    .catch((err) => next({
      log: 'Query error in taskController.postTask',
      status: 400,
      message: { err },
    }));
};

taskController.getTasks = (req, res, next) => {
  // select all the rows from tasks
  const string = 'SELECT * FROM tasks;';
  // use our connection to the database to query the string
  db.query(string)
    // store the returned array into res.locals
    .then((response) => {
      res.locals.tasks = response.rows;
      return next();
    })
    // if there's an error, return err object
    .catch((err) => next({
      log: 'Query error in taskController.getTasks',
      status: 400,
      message: { err },
    }));
};

taskController.deleteTask = (req, res, next) => {
  // use destructuring to pull id out of request body
  const { id } = req.body;
  // create query string to delete task from database
  const string = `
  DELETE FROM tasks
  WHERE _id = $1
  returning *;
  `;
  // put id into array and use bang operator to inject it into query string
  const values = [id];
  // query database with string and array of values
  db.query(string, values)
    // store returned response in res.locals
    .then((response) => {
      res.locals.response = response.rows;
      return next();
    })
    // if there's an error, return err object
    .catch((err) => next({
      log: 'Query error in taskController.deleteTask',
      status: 400,
      message: { err },
    }));
};

module.exports = taskController; /* {

}; */
