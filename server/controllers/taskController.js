const db = require('../models/TaskModel')

const taskController = {}

// insert into table
taskController.postTask = (req, res, next) => {
  // gets the task out of the body
  const { task } = req.body;
  const taskParam = [task]
  const taskQuery = 'INSERT INTO task (item) VALUES ($1)'
  db.query(taskQuery, taskParam, (err) => {
    if (err) {
      // need to fix error handler 
      next(err);
    }
    return next();
  })
}

// gets back all the info
taskController.getTask = (req, res, next) => {
  const getTasksQuery = 'SELECT * FROM task'
  db.query(getTasksQuery, (err, response) => {
    if (err) next(err);
    else {
      // console.log(response)
      res.locals.getInfo = response.rows
      // console.log(res.locals.getInfo)
      return next();
    }
  })
}

// delete the task
taskController.deleteTask = (req, res, next) => {
  const { id } = req.body
  const idParam = [id]
  const deleteQuery = 'DELETE FROM task WHERE id = $1'
  console.log(idParam[0])
  db.query(deleteQuery, idParam, (err) => {
    if (err) next(err);
    else {
      return next();
    }
  })

}

// need to add cookie controller 
taskController.cookie = (req, res, next) => {
  const { token } = req.body
  // if not log in
  if (token !== admin) res.response("You must be signed in to view this page")

}


module.exports = taskController;
