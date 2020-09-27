const db = require('../models/TaskModel');

const taskController = {};

taskController.getTasks = (req, res, next) => {
  const taskQuery = 'SELECT * FROM task;';
  db.query(taskQuery, (err, results) => {
    if(err) {
      return next(err);
    }
    res.locals.tasks = results.rows;
    console.log(res.locals.tasks);
    return next();
  });
};

taskController.postTask = (req, res, next) => {
  const addQuery = {
    text: 'INSERT INTO Task (item) VALUES ($1);',
    values: [req.body.task]
  };
  db.query(addQuery, (err, results) => {
    if(err) {
      return next(err);
    }
    console.log('add success');
    return next();
  });
};

taskController.deleteTask = (req, res, next) => {
  console.log(req.body.id);
  const removeQuery = {
    text: 'DELETE FROM Task WHERE id=$1;',
    values: [req.body.id]
  };
  db.query(removeQuery, (err, results) => {
    if(err) {
      return next(err);
    }
    console.log('remove success');
    return next();
  })

  return next();
}

module.exports = taskController;
