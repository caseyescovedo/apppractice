const taskController = {};
const db = require('../models/TaskModel');

taskController.postTask = (req, res, next) => {
  const { item } = req.body;
  const query = `INSERT INTO Tasks (item)
                 VALUES ($1)
                 RETURNING *`;
  const values = [item];
  db.query(query, values)
    .then(() => next())
    .catch((err) => {
      console.log(err);
      return next();
    });
};

taskController.getTasks = (req, res, next) => {
  const query = 'SELECT * FROM Tasks';
  db.query(query)
    .then((response) => {
      res.locals.tasks = response.rows;
      return next();
    })
    .catch((err) => {
      console.log(err);
      return next();
    });
};

taskController.deleteTask = (req, res, next) => {
  const { id } = req.body;
  const query = `DELETE FROM Tasks 
                 WHERE id = $1
                 RETURNING *`;
  const values = [id];
  db.query(query, values)
    .then(() => next())
    .catch((err) => {
      console.log(err);
      return next();
    });
};

module.exports = taskController;
