const db = require('../models/TaskModel.js');

const taskController = {};

taskController.getTasks = (req, res, next) => {
  const sqlReq = 'SELECT * FROM Task';
  db.query(sqlReq)
    .then((data) => {
      res.locals.tasks = data.rows;
      console.log(data.rows);
      return next();
    })
    .catch((err) => next(err));
};

taskController.postTask = (req, res, next) => {
  const taskItem = req.body.value;
  const sqlReq = 'INSERT INTO Task (item) VALUES ($1)';
  const values = [taskItem];

  db.query(sqlReq, values)
    .then((data) => {
      res.locals.tasks = taskItem;
      console.log(data.command);
      return next();
    })
    .catch((err) => next(err));
};

taskController.deleteTask = (req, res, next) => {
  const taskItem = req.params.id;
  console.log('task item', taskItem);
  const sqlReq = 'DELETE FROM Task WHERE id=$1';
  const values = [taskItem];
  db.query(sqlReq, values)
    .then((data) => {
      res.locals.tasks = data;
      return next();
    })
    .catch((err) => next(err));
};

module.exports = taskController;
