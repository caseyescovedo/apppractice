// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const mongoose = require('mongoose');

const myURI = 'mongodb+srv://jmadrigal:kqrzij37@cluster0.0uxut.mongodb.net/assessment?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true })
  .then( () => console.log('connected to MongoDB'))
  .catch( err => console.log('error in Mongo', err));

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  item: {type: String, required: true},
  created_at: {type: Date, default: Date.now }
});

const Task = mongoose.model('task', taskSchema);

module.exports = Task; // <-- export your model
