const db = require('../models/TaskModel');

const taskController = {};

// CREATES NEW ITEM IN DB
taskController.postTasks = (req, res, next) => {
  const { item } = req.body;
  const queryString = `INSERT INTO Task (item) VALUES ($1) RETURNING *;`;
  const values = [item];
  db.query(queryString, values)
    .then((result) => {
      console.log('ADDED TO THE DB: ', result.rows[0]);
      res.locals.addedItem = result.rows[0].item;
      return next();
    })
    .catch((err) => console.log('Error in controller.postTasks: ', err));
};

// RETRIEVES ALL ITEMS FROM THE DB AND SEND IT BACK AS JSON
taskController.getTasks = (req, res, next) => {
  console.log('GET TASK CONTROLLER HERE');
  const queryString = `SELECT * FROM Task;`;
  db.query(queryString)
    .then((result) => {
      console.log('RETRIEVED FROM DB: ', result.rows);
      res.locals.allItems = result.rows;
      return next();
    })
    .catch((err) => console.log('Error in controller.getTasks: ', err));
};

// DELETES ITEM FROM DB IF IT EXISTS
taskController.deleteTask = (req, res, next) => {
  const { item } = req.body;
  const queryString = `DELETE FROM Task WHERE item=$1 RETURNING *;`;
  const values = [item];
  db.query(queryString, values)
    .then((result) => {
      console.log('DELETED FROM THE DB: ', result.rows[0]);
      res.locals.deletedItem = result.rows[0].item;
      return next();
    })
    .catch((err) => console.log('Error in controller.deleteTask: ', err));
};

module.exports = taskController;
