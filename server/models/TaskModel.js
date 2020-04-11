const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = `mongodb+srv://${process.env.PASSWORD}@tasks-nxs5v.mongodb.net/test?retryWrites=true&w=majority`;

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

//connects mongoose to the mongodb and returns a promise
//We want to store our data in a collection/table called Task.
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'tasks',
  })
  .then(() => {
    console.log('Connected to DB');
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });

//defines the model for the task
//All items in the database must have a property item which is a string
//all items should be stored with the time they were created_at. This should default to the current time
const schema = new mongoose.Schema({
  item: String,
  created_at: { type: Date, default: Date.now },
});
//builds new Task  models
const Task = mongoose.model('Task', schema);

module.exports = Task; // <-- export your model
