const mongoose = require('mongoose');
// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI =
  'mongodb+srv://win:winfordlin@users-jo7j2.mongodb.net/users?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

mongoose.connect(URI);

mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

const TaskSchema = new mongoose.Schema({
  item: { type: String },
  created_at: { type: Date, default: Date.now },
});

const Task = mongoose.model('task', TaskSchema);

module.exports = Task; // <-- export your model
