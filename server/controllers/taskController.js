const db = require('../models/TaskModel');
const taskController = {};

taskController.postTasks = (req, res, next) => {
  const { item } = req.body;
  const enterTask = `INSERT INTO task (item) VALUES ('${item}') RETURNING *`;
  db.query(enterTask)
    .then((data) => {
      res.locals.postTasks = data.rows[0];
      console.log('res locals postTasks', res.locals.postTasks);
      return next();
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

taskController.getTasks = (req, res, next) => {
  const getAllTasks = `SELECT * FROM task`;
  db.query(getAllTasks)
    .then((data) => {
      res.locals.allTasks = data.rows;
      console.log('all tasks', res.locals.allTasks);
      return next();
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

taskController.deleteTask = (req, res, next) => {
  const { id } = req.params;
  const deleteOneTask = `DELETE FROM task WHERE _id = '${id}' RETURNING *;`;
  db.query(deleteOneTask)
    .then((data) => {
      res.locals.deletedTask = data.rows[0];
      console.log('deleted task', res.locals.deletedTask);
      return next();
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

module.exports = taskController;
