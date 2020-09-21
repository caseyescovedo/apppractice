const db = require('../models/TaskModel');

const controller = {};

controller.getTasks = (req, res, next) => {
  queryText = `SELECT * FROM tasks`;
  db.query(queryText)
    .then((data) => {
      res.locals.get = data.rows;
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

controller.postTask = (req, res, next) => {
  const { item } = req.body;
  const params = [item];
  const queryText = `INSERT INTO tasks (item, created_at) VALUES ($1, CURRENT_TIME);`;
  db.query(queryText, params, (err, result) => {
    if (err) {
      return next(err);
    }
    res.locals.post = result.rows[0];
    return next();
  });
};

controller.deleteTask = (req, res, next) => {
  const { task_id } = req.body;
  const values = [task_id];
  db.query(
    `DELETE from todo WHERE task_id = $1 RETURNING task_id;`,
    values,
    (err, response) => {
      if (err) {
        return next(err);
      } else {
        res.locals.deleted = response.rows[0];
        return next();
      }
    }
  );
};

module.exports = controller;
