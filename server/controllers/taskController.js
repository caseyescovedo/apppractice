// REQUIRE TASKMODEL.JS AND ASSIGN IT TO VARIABLE DB
const db = require('../models/TaskModel');
// DECLARE VARIABLE TASKCONTROLLER AND ASSIGN TO EMPTY OBJECT
const taskController = {};

// BUILD MIDDLEWARE CRUD METHODS ONTO CONTROLLER DB

// POST TASK
taskController.postTask = (req, res, next) => {
  // DESTRUCTURE item FROM REQ.BODY
  const { item } = req.body;
  // STORE VARIABLES FROM REQ.BODY IN AN ARRAY
  const values = [item];
  // QUERY TEXT WITH VALUES AS PARAMERITIZED VARIABLES
  const queryText = `INSERT INTO tasks (item) VALUES ($1) RETURNING *;`;
  // QUERY DB
  db.query(queryText, values)
    .then((dbResult) => {
      res.locals.newTask = dbResult.rows[0];
      console.log('New Task Created: ', dbResult.rows[0]);
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

// GET TASKS
taskController.getTasks = (req, res, next) => {
  // QUERY TEXT
  const queryText = `SELECT * FROM tasks;`;
  // QUERY DB
  db.query(queryText)
    .then((dbResult) => {
      res.locals.allItems = dbResult.rows;
      console.log('All Items from db: ', dbResult.rows);
      return next();
    })
    .catch((err) => {
      console.log('Get Tasks Error: ', err);
      return next(err);
    });
};

// DELETE TASK
taskController.deleteTask = (req, res, next) => {
  // DESTRUCTURE _id FROM REQ.BODY
  const { _id } = req.body;
  // STORE _id IN VALUES ARRAY
  const values = [_id];
  // QUERY TEXT
  const queryText = `DELETE FROM tasks WHERE _id = $1 RETURNING *;`;
  // QUERY DB
  db.query(queryText, values)
    .then((dbResult) => {
      res.locals.deletedTask = dbResult.rows[0];
      console.log('Deleted Task from DB: ', dbResult.rows[0]);
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

// EXPORT TASKCONTROLLER
module.exports = taskController;
