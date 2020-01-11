const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI =
  'mongodb+srv://new-user_01:new-user_01@cluster0-enpl1.mongodb.net/test?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

mongoose
  .connect(URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'ToDoAppDB'
  })
  .then(() => console.log('Connected to Mongo DB'))
  .catch(err => console.log(err));

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

const TaskSchema = new Schema({
  item: { type: String, required: true },
  created_at: { type: Date, default: Date.now() }
});

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task; // <-- export your model
