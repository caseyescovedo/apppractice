// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'mongodb+srv://Alex:Alex@cluster0-mhly7.mongodb.net/test?retryWrites=true&w=majority';
const mongoose = require('mongoose');

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// Connecting Database
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'DBtest',
})


// Model
const taskSchema = new mongoose.Schema ({
  item: {type: String, required: true},
  created_at: Date,
});

const Task = mongoose.model('task', taskSchema)

// Export
module.exports = Task; // <-- export your model
