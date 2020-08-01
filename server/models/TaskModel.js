const mongoose = require('mongoose');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI =
  'mongodb+srv://andy:starwarsdatabase@cluster0.00y2a.mongodb.net/assessment?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

mongoose
  .connect(URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'stable-matching',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  item: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = {
  Task,
};
