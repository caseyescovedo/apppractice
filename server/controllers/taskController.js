const pool = require('../models/TaskModel');

const postTask = (req, res, next) => {
  //Function postTask should create a new item in the database

  let requestQuery = req.query.task;

  let query = 'INSERT INTO Task(item) VALUES($1) RETURNING *';
  let values = [requestQuery];

  pool
    .query(query, values)
    .then(data => {
      res.status(200).send();
    })
    .catch(err => next('Database error'));
};

const getTasks = (req, res, next) => {
  // Function getTasks should retrieve all items from the database and send it back to the client as JSON

  let query = 'SELECT * FROM Task';

  pool
    .query(query, null)
    .then(data => {
      res.json(data.rows);
    })
    .catch(err => next('Database error'));
};

const deleteTask = (req, res, next) => {
  //  Function deleteTask should find items in the database based on an ID number and delete that item if it exists

  let requestQuery = req.query.id;

  let query = 'DELETE FROM Task WHERE id = $1 RETURNING *';
  let values = [requestQuery];

  pool
    .query(query, values)
    .then(data => {
      res.json(data.rows);
    })
    .catch(err => next('Database error'));
};

module.exports = {
  postTask,
  getTasks,
  deleteTask
};
