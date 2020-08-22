const Task = require('../models/TaskModel.js');

module.exports = {
  postTask(req, res) {
    Task.create({ ...req.body },
      (err, task) => ((err) ? res.sendStatus(418) : res.json(task)));
  },

  getTasks(req, res) {
    Task.find({}, (err, tasks) => ((err) ? res.sendStatus(418) : res.json(tasks)));
  },

  deleteTask(req, res) {
    Task.findOneAndDelete({ ...req.body },
      (err) => ((err) ? res.sendStatus(418) : res.sendStatus(200)));
  },
};
