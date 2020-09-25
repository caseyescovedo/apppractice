const db = require('../models/TaskModel');

const controller = {};

controller.postTask = (req, res, next) => {
  console.log(`req:body ${req.body}`);
  const { item, created_at } = req.body;
  const values = [item, created_at];
  // here we query the database, passing in the items that we received
  db.query(
    'INSERT INTO tasks (item, created_at) VALUES ($1, $2) RETURNING *;',
    values,
    (err, post) => {
      if (err) return next(err);
      // send response back to client; informing them we got their info and here's what it was
      res.locals.postedData = post.rows[0];
      return next();
    }
  );
};

controller.getTasks = (req, res, next) => {
  const text = 'SELECT * FROM tasks;';
  db.query(text)
    .then((data) => {
      res.locals.retrievedData = data;
      return next();
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

controller.deleteTask = (req, res, next) => {
  const { _id } = req.body;
  const values = [_id];

  db.query(
    'DELETE FROM tasks WHERE _id = $1 RETURNING _id;',
    values,
    (err, response) => {
      if (err) return next(err);

      res.locals.deletedData = response.rows[0];
      return next();
    }
  );
};

module.exports = controller;
