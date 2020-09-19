const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  task: String,
  date: String,
  time: String,
  cost: Number,
})

module.exports = Task = mongoose.model('taskInfo', taskSchema);