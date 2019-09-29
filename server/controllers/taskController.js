const Task = require('../models/TaskModel');

module.exports = {
  postTask(req, res) {
    console.log(req.body, '<---')
    console.log(req.body.item);
    Task.create({item: req.body.item, date: req.body.date} , (error, task) => {
      if (error) {
        res.sendStatus(404)
      } else {
        res.status(200).send(task)
      }
    })
  },

  //should retrueve all items from the database
  getTasks(req, res) {
    Task.find({}, (error, tasks) => {
      if (error) {
        res.sendStatus(404)
      } else {
        res.status(200).send(tasks)
      }
    })
  },

  //find items in the database based on an ID number and delete that item if it exists
  deleteTask(req, res) {
    const id = req.body.id;
    Task.findByIdAndRemove(id, (error, todo) => {
      if (error) {
        res.sendStatus(404)
      } else {
        res.status(200).send('Deleted Successfully')
      }
    })
  }

};
