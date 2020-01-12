const db = require('../models/TaskModel');
const taskController = {};

//getTasks--retrieve all items from the database and send it back to the client as JSON
taskController.getTasks = (req, res, next) => {
  const text = `SELECT * FROM task`;
  db.query(text)
    .then(data => {
      res.locals.tasks = data.rows;
      next();
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
};

//postTask--create a new item in the database
taskController.postTask = (req, res, next) => {
  const { task } = req.body;
  const values = [task];
  const text = `INSERT INTO task (item)
                VALUES ($1)
                RETURNING *`;
  db.query(text, values)
    .then(data => {
      res.locals.tasks = data.rows;
      next();
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
};

//deleteTask--find items in the database based on an ID number and delete that item
taskController.deleteTask = (req, res, next) => {
  const { id } = req.params;
  const values = [id];
  const text = `DELETE FROM task
                WHERE id = $1`;
  db.query(text, values)
    .then(data => {
      res.locals.tasks = data.rows;
      next();
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
};

module.exports = taskController;
