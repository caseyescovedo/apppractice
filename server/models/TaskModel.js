const mongoose = require('mongoose');
// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'mongodb+srv://admin:admin@cluster0.c9aue.mongodb.net/Project0?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to db'))
  .catch(err => console.log(err));

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

const taskSchema = new mongoose.Schema({
  item: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

const Task = mongoose.model('task', taskSchema);

module.exports = Task; // <-- export your model
