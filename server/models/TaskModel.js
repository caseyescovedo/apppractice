const mongoose = require('mongoose');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI =
  'mongodb+srv://michellebholland:grouppw@cluster0.ibkca.mongodb.net/tasks?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;
mongoose
  .connect(URI, { useNewUrlParser: true })
  .then(() => console.log('Succcessfully connected to MongoDB'))
  .catch(() => console.log('ERROR connecting to MongoDB'));

const { Schema } = mongoose;

const tasks = new Schema({
  item: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

const Task = mongoose.model('Task', tasks);

module.exports = Task; // <-- export your model
