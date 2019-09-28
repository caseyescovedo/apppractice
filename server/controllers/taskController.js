const Task = require('../models/TaskModel.js');

module.exports = {

  postTask(req, res) {
    console.log(`Fetch post request good`)
    Task.create({ item: req.body.item, created_at: req.body.date }, (err, task) => {
      if (err) {
        console.log(`Create task error: ${err}`)
        res.sendStatus(404);
      } else res.status(200).send(task);
    });
  },

  getTasks(req, res) {
    console.log(`Fetch get request good`)
    Task.find({}, (err, tasks) => {
      if (err) {
        console.log(`Get all tasks error: ${err}`)
        res.sendStatus(404);
      } else res.status(200).json(tasks);
    })
  },

  deleteTask(req, res) {
    const id = req.params.id
    Task.findByIdAndDelete(id, (err, task) => {
      if (err) {
        console.log(`Delete task error: ${err}`)
        res.sendStatus(404);
      } else res.status(200);
    })
  }

};
