const db = require('../models/TaskModel')

const taskController = {};

taskController.postTask = (req,res,next) => {
  console.log(req.body.task)
  const time = Date.now();
  const query = 'INSERT INTO task(item, created_at) VALUES ($1, $2)';
  db.query(query,[req.body.task,time])
  .then(next())
  .catch( err => {
    next({
      log: 'Express middleware error in postTask',
      message: {error: err}
    })
  })
}


taskController.getTasks = (req,res,next) => {
  const query = 'SELECT item,task_id FROM task';
  db.query(query)
  .then( items => {
    res.locals.items = items.rows
    next()
  })
  .catch( err => {
    next({
      log: 'Express middleware error in getTasks',
      message:  err
    })
  })
 
}


taskController.deleteTask = (req,res,next) => {
  const query = 'DELETE FROM task WHERE task_id = $1';
  const value = [req.body.taskId];
  db.query(query,value)
  .then(next())
  .catch( err => {
    next({
      log: 'Express middleware error in deleteTask',
      message: {error: err}
    })
  })
}

module.exports = taskController;
