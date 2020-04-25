const mongoose = require('mongoose');
// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'mongodb+srv://dbuser:shwooms1@cluster0-laxv0.mongodb.net/test?retryWrites=true&w=majority';


// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

mongoose.connect(URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'Task'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

const tasksSchema = new Schema({
  item: { type: String, required: true },
  created_at: { type: Date, required: true, default: Date.now }
});

const Tasks = mongoose.model('tasks', tasksSchema)




module.exports = { Tasks }; // <-- export your model
