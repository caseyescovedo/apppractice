// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'mongodb+srv://taskapp:n5oec9Vy5rUW4wOu@cluster0-rcpls.mongodb.net/tasks?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

const mongoose = require('mongoose');

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'tasks',
})
  .then(() => console.log('Connected to Mongo DB, tasks'))
  .catch((err) => console.log(err));

const { Schema } = mongoose;

const tasksSchema = new Schema({
  item: String,
  created_at: Date,
}, { collection: 'Tasks' });

const Tasks = mongoose.model('Tasks', tasksSchema);

module.exports = mongoose.model('Tasks', tasksSchema); // <-- export your model
