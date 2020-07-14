// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const { mongoUri } = require('../startup/db');
const myURI = mongoUri;

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

/*
----------------------
Begin Assessment Code
----------------------
*/
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  item: {
    type: String,
    minlength: 1,
    maxlength: 4000,
    required: true,
  },

  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const Task = mongoose.model('tasks', taskSchema);

module.exports = Task; // <-- export your model
