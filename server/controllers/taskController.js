const db = require('../models/TaskModel');

const controller = {};

controller.postTask = (req, res, next) => {
  let {variable} = req.body
  let created_at = Date.now();
  let query = 'INSERT INTO tasks (item,created_at) VALUES ($1, $2) returning *';

  db.query(query, [variable, created_at], (err, post) => {
    if (err) {
      return next(err);
    }
    res.locals.post = post.rows[0];
    return next();
  });
};

controller.getTasks = (req, res, next) => {
  let query = 'SELECT * FROM tasks';
  db.query(query)
    .then((data) => {
      res.locals.get = data.rows;
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

controller.deleteTask = (req, res, next) => {
  let { id } = req.body;
  let query = 'DELETE from tasks where _id = $1 RETURNING _id';
  db.query(query, [id], (err, response) => {
    if (err) {
      return next(err);
    } else {
      res.locals.deleted = response.rows[0];
      return next();
    }
  });
};

module.exports = controller;
