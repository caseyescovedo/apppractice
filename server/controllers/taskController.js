const db = require('../models/TaskModel')
const controllers = {}

controllers.postTask = (req, res, next) => {
  console.log(req.body.task)
  const { task } = req.body
  const currentdate = new Date();
  const taskArr = [task, currentdate]
  const queryString = 'INSERT INTO Tasks (item, created_at) VALUES($1, $2)'

  db.query(queryString, taskArr, (err, response) => {
    if (err) return next(console.log('error in the postTask middleware', err))
  })
  next()
}

controllers.getTasks = (req, res, next) => {
  const queryString = 'SELECT item FROM "tasks"'

  db.query(queryString, (err, response) => {
    if (err) return next(console.log('error in the postTask middleware', err))
    res.status(200).json(response.rows)
  })
}

controllers.deleteTask = (req, res, next) => {
  const { id } = req.body
  const idArr = [id]
  const queryString = 'DELETE FROM Tasks WHERE _id = $1'

  db.query(queryString, idArr, (err, response) => {
    if (err) return next(console.log('error in the postTask middleware', err))
    // res.status(200).json(response.rows)
  })
  next()
}


module.exports = controllers;
