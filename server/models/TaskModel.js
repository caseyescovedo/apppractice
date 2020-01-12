const mongoose = require('mongoose');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'mongodb+srv://dave:dave123@cluster0-ygffo.mongodb.net/test?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(myURI, options, (error) => {
  if (error) console.log('error with mongoose connection -> ', error);
  console.log('Connected to MongoDB');
});

const schemaTask = new mongoose.Schema({
  item: { type: String },
  created_at: { type: Date, default: Date.now },
});

const Task = mongoose.model('Task', schemaTask);

module.exports = Task; // <-- export your model
