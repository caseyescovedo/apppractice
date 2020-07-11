// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const mongoose = require('mongoose');

const myURI = 'mongodb://localhost/todo';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

const taskSchema = new mongoose.Schema({
  item: String,
  created_at: Date,
});

mongoose.connect(
  myURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('well it got run but it should not be here');
  }
);
// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

module.exports = mongoose.model('Task', taskSchema); // <-- export your model
