const express = require('express');
const taskController = express.Router();
const db = require('../models/TaskModel');

// GET request middleware
taskController.getTasks = (req, res, next) => {
  queryText = 'SELECT * FROM tasks;';
  db.query(queryText)
    .then(data => {
      res.locals.items = data.rows;
      return next();        
    })
    .catch(err => console.log(err));
};

// POST request middleware
taskController.postTask = (req, res, next) => {
  const { item, created_at } = req.body;
  queryText = 'INSERT INTO tasks (item, created_at) VALUES ($1, $2) RETURNING *;';
  queryParams = [item, created_at];
  db.query(queryText, queryParams)
    .then(data => {
      res.locals.newItem = data.rows[0];
      return next();
    })
    .catch(err => console.log(err));
};

// DELELTE request middleware
taskController.deleteTask = (req, res, next) => {
  const { _id } = req.body;
  queryText = 'DELETE FROM tasks WHERE _id=$1 RETURNING *';
  queryParams = [_id];
  db.query(queryText, queryParams)
    .then(data => {
      res.locals.deletedItem = data.rows[0];
      return next();
    })
    .catch(err => console.log(err));
};

module.exports = taskController;
