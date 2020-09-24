const { response } = require('express');
//import the database
const db = require('../models/taskModel');

// declare a const var with the label controller that will hold all of our requests
const controller = {};

// post method goes here
controller.postTask = (req, res, next) => {
  const { item, created_at } = req.body;
  const values = [item, created_at];
  db.query(
    `INSERT INTO task (item, created_at) VALUES ($1, $2) RETURNING *;`,
    values,
    (err, post) => {
      if (err) {
        return next(err);
      }
      res.locals.taskPost = post.rows[0];
      return next();
    },
  );
};

// get method goes here
controller.getTask = (req, res, next) => {
  console.log('inside of task controller get!');
  const requestInfo = `SELECT  * FROM task;`;
  db.query(requestInfo)
    .then((data) => {
      console.log(data);
      res.locals.taskInfo = data;
      return next();
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

// delete method goes here
controller.deleteTask = (req, res, next) => {
  const { _id } = req.body;
  const userId = [_id];
  db.query(
    `DELETE FROM task WHERE _id = $1 RETURNING _id;`,
    userId,
    (err, response) => {
      if (err) {
        return next(err);
      } else {
        res.locals.taskDelete = response.rows[0];
        return next();
      }
    },
  );
};

// export all modules
module.exports = controller;
