const db = require('../models/TaskModel');

const taskController = {};

//quiries an index of all tasks
taskController.getTasks = (req, res, next) => {
    const indexTasks = `
    SELECT * FROM tasks
    `;

    db.query(indexTasks)
    .then(data => {
        res.locals.tasks = data.rows;
        res.locals.success = true;
        return next();
      }
    )
    .catch(err => {
      console.log(err)
      res.locals.sucess = false
      next({
        log: 'there was an error in the the tasksController.getTasks',
        message: {err: err}
      });
    })
};

//adds a task to the database
taskController.postTask = (req, res, next) => {
  const addTask = `
  INSERT INTO tasks (item)
  VALUES ($1) 
  RETURNING _id
  `;

  const queryParams = [req.body.task];

  db.query(addTask, queryParams)
  .then((data) => {
    res.locals.success = true;
    res.locals.id = data.rows[0];
    return next();
  })
  .catch(err =>  {
    console.log(err)
    res.locals.success = false;
    next({
      log: 'there was an error in the tasksController.postTask',
      message: {err: err}
    });
  })
};

//removes a task from the database
taskController.deleteTask = (req, res, next) => {
  const removeTask = `
  DELETE FROM tasks
  WHERE _id = $1
  `;

  queryParams = [req.params.id];

  db.query(removeTask, queryParams)
  .then(() => {
    res.locals.success = true;
    return next();
  })
  .catch(err =>  {
    console.log(err)
    res.locals.success = false;
    next({
      log: 'there was an error in the tasksController.deleteTask',
      message: {err: err}
    });
  })
};

module.exports = taskController;
