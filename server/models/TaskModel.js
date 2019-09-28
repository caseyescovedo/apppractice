// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'mongodb+srv://bryv38:114509Helo@todo-ree8o.mongodb.net/test?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect(URI, function (err, db) {
  if (err) {
    console.log('Unable to connect to the server. Please start the server. Error:', err)
  } else {
    console.log(`Connected to Server successfully!`)
  }
})

const task = new Schema({
  item: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
})

const Task = mongoose.model('Task', task);

module.exports = Task; // <-- export your model
