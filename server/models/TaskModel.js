// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'mongodb+srv://jphong:codesmith01@cluster0-9tk0l.mongodb.net/test?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

const mongoose = require('mongoose');

// Create our Task collection, which will render documents that will be stored in DB
const taskSchema = new mongoose.Schema({
  item: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
})

// Call mongoose.model() on the 'taskSchema' to compile a model
const Task = mongoose.model('task', taskSchema)

// Only the 'Task' document is exported out from the the mongoose schema on line 11
module.exports = Task  //mongoose.model('task', taskSchema); // <-- export your model
