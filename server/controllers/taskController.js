const pool = require('../models/TaskModel');

const postTask = (req, res, next) => {
  //Function postTask should create a new item in the database

  let query = 'INSERT INTO Task(item) VALUES($1) RETURNING *';
  let values = ['So Cool'];

  pool
    .query(query, values)
    .then(data => console.log(data.rows))
    .catch(err => next('Database error'));

  return next();
};

const getTasks = (req, res, next) => {
  // Function getTasks should retrieve all items from the database and send it back to the client as JSON

  let query = 'SELECT * FROM Task';

  pool
    .query(query, null)
    .then(data => console.log(data.rows))
    .catch(err => next('Database error'));

  return next();
};

const deleteTask = (req, res, next) => {
  //  Function deleteTask should find items in the database based on an ID number and delete that item if it exists

  return next();
};

module.exports = {
  postTask,
  getTasks,
  deleteTask
};
