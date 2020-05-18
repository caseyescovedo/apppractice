const db = require('../models/TaskModel');

const taskController = {};

taskController.createTable = (req, res, next) => {
  const queryString = 
  `CREATE TABLE IF NOT EXISTS Task (
    _id SERIAL PRIMARY KEY,
    item VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`
  db.query(queryString)
    .then(res => {
      return next();
    })
    .catch(err => console.log('Error in taskController.createTable: ', err))
}

// Ive tried to debug this for 2 hours and have tried A LOT of solutions but i keep getting this error:
// SyntaxError: Unexpected token " in JSON at position 0 at JSON.parse(<anonymous>)
// or something very similar --> somehow i need the request header, but the request header also breaks the request
// another method i tried doesnt get this error but doesnt pass along the request body
taskController.postTask = (req, res, next) => {
  console.log('inside postTask middleware', req.body)
  // const userInputs = req.body;
  // console.log(req.body);
  // const queryString = 'INSERT INTO Task (item) VALUES ($1)'
  // const values = null;
  return next();
  // db.query(queryString, values)
  //   .then(res => {
  //     return next();
  //   })
  //   .catch(err => console.log('Error in taskController.postTask: ', err))
}

taskController.getTasks = (req, res, next) => {
  const queryString = 'SELECT * FROM Task'
  db.query(queryString)
    .then(data => {
      res.locals.tasks = data.rows;
      return next()
    })
    .catch(err => console.log('Error in taskController.getTasks: ', err))
}

taskController.deleteTask = (req, res, next) => {
  const id = req.params.id;
  const queryString = 'DELETE FROM Task WHERE _id = ($1)'
  const values = [id];

  db.query(queryString, values)
    .then(res => {
      return next()
    })
    .catch(err => console.log('Error in taskController.deletesTask: ', err))
}

module.exports = taskController;
