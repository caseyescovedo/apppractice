const Task = require("../models/TaskModel");

module.exports = {
  // retreive items from db and sen dback as JSON
  // getTasks
  getTask: (req, res) => {
    console.log('middleware: getTask')
    Task.find()
    // returned from db as JSON
    .then(items => res.status(200).send(items))
    .catch(err => res.status(400).send(err));
  },
  // create new item in db
  // postTask
  postTask: (req, res, next) => {
    console.log('middleware: postTask')
    console.log(req.body)
    const newTask = new Task({ item: req.body })
    newTask
      .save()
      .then(resp => res.status(200).send(resp))
      .catch(err => res.status(400).send(err));
  },
  // find items in db based on ID  number and delete
  // deleteTask
  deleteTask: (req, res, next) => {
    console.log('middleware: deleteTask')
    Task.deleteOne(req.body, err => res.status(400).send(err))
    res.status(200).send('Task deleted');
  },
};
