// imports
const Task = require('../models/TaskModel.js')


// ! function to post taks
const postTask = (req, res, next) => {
  console.log("post taks hit")
  Task.create(req.body) // creating the task
  .then((data) => {
    res.locals.data = data
    return next()
  })
  .catch((err) => {
    console.log("error in post task " + err)
  })
}



const getTasks = (req, res, next) => {
  console.log("get tasks middleware hit")
  Task.find({}).exec() // find all in the database
  .then((data) => {
    res.locals.data = data;
    return next()
  })
  .catch((err) => {
    console.log("error in get tasks " + err)
  })
}

const deleteTask = (req, res, next) => {
  console.log("delete task middleware hit")




}







module.exports = {
  postTask,
  getTasks,
  deleteTask


};
