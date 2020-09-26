const db = require('../models/TaskModel');

const taskController = {};

// retrieve all items from db and send them back to the client as JSON
taskController.getTasks = (req, res, next) => {
  const text = `SELECT * from tasks;`;
  db.query(text)
    .then((data) => {
      res.locals.info = data;
      return next();
    })
    .catch((err) => {
      // console.log('getTasks error', err);
      return next(err);
    });
};

// create a new item in db and send it back to the client as JSON
taskController.postTask = (req, res, next) => {
  // we want information like item, info, date, and status from req.body, set those datapoints to variables.
  console.log('postTask req.body: ', req.body);
  const { item } = req.body;
  const values = [item];
  const text = `INSERT INTO Tasks (item) VALUES ($1) returning *`;

  db.query(text, values, (err, post) => {
    if (err) return next(err);
    else {
      res.locals.post = post.rows[0];
      return next();
    }
  });
};

// find items based on an ID number and delete it if it exists
// if the ID number to delete does not exist in db, db returns 0
taskController.deleteTask = (req, res, next) => {
  console.log('deleteTask req.body: ', req.body);
  const { _id } = req.body;
  const values = [_id];
  db.query(
    `DELETE from Tasks WHERE _id = $1 RETURNING _id;`,
    values,
    (err, deleted) => {
      if (err) {
        return next(err);
      } else {
        res.locals.delete = deleted.rows[0];
        return next();
      }
    }
  );
};

module.exports = taskController;
