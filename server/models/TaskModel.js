// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const mongoose = require('mongoose');
const myURI = 'mongodb+srv://corneeltron:mongolia87@cluster0-1rk9e.mongodb.net/test?retryWrites=true&w=majority'

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// Connect to MongoDB
mongoose.connect(URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'exam-database'
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));


const Schema = mongoose.Schema;

const TasksSchema = new Schema({
  item: {
    type: String,
    require: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Task = mongoose.model("task", TasksSchema);


//remember export model

module.exports = Task;
