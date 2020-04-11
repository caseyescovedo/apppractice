const taskModel = require('../models/TaskModel');

const taskController = {};

//controller to get tasks from database
taskController.getTasks = (req, res, next) => {
  const getTasks = `
  SELECT * FROM task`;
  taskModel.query(getTasks)
  .then((response) => {
    res.locals.tasks = response.rows;
    next();
  })
  .catch(err => {
    return next(err);
  })
};


//controller to post tasks to database
taskController.postTask = (req, res, next) => {
  const {item} = req.body;
  const postTask = {
    text: `
    INSERT INTO task (item)
    VALUES ($1)`,
    values: [item]
  };
  taskModel.query(postTask)
  .then((response) => {
    next();
  })
  .catch(err => {
    return next(err);
  });
};



//controller to delete tasks from database
taskController.deleteTask = (req, res, next) => {
  const {task_id} = req.body;
  const deleteTask = {
    text: `
    DELETE FROM task
    WHERE task_id = $1`,
    value: [task_id]
  };
taskModel.query(deleteTask)
  .then((response) => {
    return next();
  })
  .catch(err => {
    return next(err)
  })
};


module.exports = taskController;