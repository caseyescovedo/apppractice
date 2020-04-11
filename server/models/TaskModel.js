const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = `mongodb+srv://${process.env.PASSWORD}@tasks-nxs5v.mongodb.net/test?retryWrites=true&w=majority`;

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

//connects mongoose to the mongodb and returns a promise
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'Tasks',
  })
  .then(() => {
    console.log('Connected to DB');
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });

//defines the model for the task
const schema = new mongoose.Schema({
  item: String,
  created_at: { type: Date, default: Date.now },
});
const Task = mongoose.model('Task', schema);

module.exports = Task; // <-- export your model
