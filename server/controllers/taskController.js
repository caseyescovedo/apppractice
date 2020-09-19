const db = require('../models/TaskModel');

const taskController = {};

taskController.postTask = (req, res, next) => {
  const { item, created_at } = req.body;
  const values = [item, created_at];

  const queryCommand = 'INSERT INTO tasks (item, created_at) VALUES ($1, $2) returning *';

  db.query(queryCommand, values, (err, post) => {
    if (err) {
      return next(err);
    }
    res.locals.post = post.rows[0];
    return next();
  });
};

taskController.getTasks = (req, res, next) => {
  const queryCommand = 'SELECT * FROM tasks';

  db.query(queryCommand)
    .then((data) => {
      res.locals.info = data;
      return next();
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

taskController.deleteTask = (req, res, next) => {
  const { _id } = req.body;
  const values = [_id];
  const queryCommand = 'DELETE from tasks WHERE _id = $1 RETURNING _id;';
  db.query(queryCommand, values, (err, response) => {
    if (err) {
      return next(err);
    }
    // eslint-disable-next-line prefer-destructuring
    res.locals.deleted = response.rows[0];
    return next();
  });
};

module.exports = taskController;
