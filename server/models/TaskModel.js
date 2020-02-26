const mongoose = require('mongoose');

const {Schema} = mongoose;

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'mongodb+srv://nabramow:gradmongo!@cluster0-ufsoo.mongodb.net/test?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

// best practice to make value an option with info about type, required, unique, etc.
const taskSchema = new mongoose.Schema({
  item: { type: String, required: true },
  created_at: { type: String },
});

const Task = mongoose.model('ToDo', taskSchema);


module.exports = Task; // <-- export your model
