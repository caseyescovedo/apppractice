const mongoose = require('mongoose');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI =
  'mongodb+srv://dbUser:NospecialChars@cluster0.khec2.mongodb.net/Message?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

mongoose
  .connect(URI, { useNewUrlParser: true, dbName: 'Task' })
  .then(() => console.log('connected to mongodb'))
  .catch((err) => console.log('err connecting to mongodb:', err));

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;
const taskSchema = new mongoose.Schema({
  item: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const taskModel = mongoose.model('tasks', taskSchema);

module.exports = taskModel; // <-- export your model
