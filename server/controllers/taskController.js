const models = require('../models/TaskModel')

const taskController = {};
// Tasks

taskController.postTask = (req, res, next) => {
  models.Tasks.create([{
    item: req.body.item,
    created_at: Date.now()
  }])
    .then(next())

}

taskController.getTasks = (req, res, next) => {
  models.Tasks.find()
    .then(response => {
      res.locals.tasks = response
    })
    .then(() => next())

}

taskController.deleteTask = (req, res, next) => {
  // double check this
  const deleteItem = req.params.id
  models.Tasks.deleteOne(deleteItem)
    .then((req, res) => {
      res.status(200)
    })
}












module.exports = taskController;
