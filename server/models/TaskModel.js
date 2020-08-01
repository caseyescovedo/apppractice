const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI =
  'mongodb+srv://htaing:ZDliondwbIFRVujE@solo-project-devops-4.krucr.mongodb.net/<dbname>?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'htaing-grad-assessment',
});

const taskSchema = new Schema({
  item: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

const Task = mongoose.model('task', taskSchema);

module.exports = Task; // <-- export your model
