const db = require('../models/TaskModel');

const taskController = {};

// get all tasks
taskController.getTasks = (req, res, next) => {
  const text = 
  `SELECT * FROM "Tasks";`

  db.query(text)
    .then(data => {
      res.locals.tasks = data.rows;
      return next();
    })
    .catch(err => next(err));
}

// create (or post) task
taskController.postTask = (req, res, next) => {
  const { item } = req.body;
  const text = 
  `INSERT INTO "Tasks" (item, created_at)
  VALUES ($1, NOW())
  RETURNING *;`;

  const values = [ item ];
  
  db.query(text, values)
    .then(data => {
      console.log('data from post request', data);
      res.locals.data = data.rows;
      return next();
    })
    .catch(err => next(err));
}

// delete task
taskController.deleteTask = (req, res, next) => {
  const { id } = req.params;
  const text =
  `DELETE FROM "Tasks"
  WHERE id = $1
  RETURNING *;`;
  
  const values = [ id ];
  db.query(text, values)
    .then(data => {
      res.locals.deleted = data.rows[0];
      return next();
    })
    .catch(err => next(err))
}

module.exports = taskController;