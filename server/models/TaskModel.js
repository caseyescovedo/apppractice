const mongoose = require('mongoose');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'mongodb+srv://nicolaspita:rambler@cluster0.incrp.mongodb.net/Task?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

// connect to the data base
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to db...')
  })
  .catch((err) => console.log(err));

// create Task model
const taskModel = mongoose.Schema({
  item: String,
  created_at: { type: Date, default: Date.now }
})

const Task = mongoose.model('Task', taskModel);

module.exports = Task; // <-- export your model
