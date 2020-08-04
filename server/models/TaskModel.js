const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Loads any variables in the .env file into `process.env`
require('dotenv').config();

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
// const myURI = '';

// Use testing database if it has been set, otherwise use local dev database
const URI = process.env.MONGO_URI || process.env.HAEJINS_URI;

mongoose.connect(URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'junior_ass',
});

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

const taskSchema = new Schema({
  item: String,
  created_at: { type: Date, default: Date.now },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task; // <-- export your model
