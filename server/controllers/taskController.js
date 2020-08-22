const db = require('../models/TaskModel.js');
const taskController = {};

// Function postTask should create a new item in the database
taskController.postTask = (req, res, next) => {
  const task = document.getElementById('task').value;
  const queryString = `
  INSERT INTO Task (item, created_at)
  VALUES (${task}, NOW());
  `;
  db.query(queryString).catch((err) => {
    return next({
      log: `Error occurred with taskController.postTask middleware: ${err}`,
      message: { err: 'An error occured with SQL when posting a task.' },
    });
  });
  next();
};

// Function getTasks should retrieve all items from the database and send it back to the client as JSON
taskController.getTasks = (req, res, next) => {
  const queryString = `
    SELECT item FROM Task;
    `;
  db.query(queryString)
    .then((data) => {
      // send data back to client as JSON
    })
    .catch((err) => {
      return next({
        log: `Error occurred with taskController.getTasks middleware: ${err}`,
        message: { err: 'An error occured with SQL when retrieving tasks.' },
      });
    });
  return next();
};

// Function deleteTask should find items in the database based on an ID number and delete that item if it exists
taskController.deleteTask = (req, res, next) => {
  const queryString = `
    DELETE FROM Task WHERE item = ${_id};
    `;
  db.query(queryString).catch((err) => {
    return next({
      log: `Error occurred with taskController.deleteTask middleware: ${err}`,
      message: { err: 'An error occured with SQL when deleting a task.' },
    });
  });
  next();
};

module.exports = taskController;
