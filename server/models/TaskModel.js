const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now
  }
})

const Task = mongoose.model('task', taskSchema);




module.exports = Task; // <-- export your model
