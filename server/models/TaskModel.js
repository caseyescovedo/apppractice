const mongoose = require('mongoose');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = '';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

const TaskSchema = new mongoose.Schema({
  item: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model('tasks', TaskSchema);

module.exports = { URI, Task }; // <-- export your model
