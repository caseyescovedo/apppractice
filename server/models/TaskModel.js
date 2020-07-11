// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI =
  'mongodb+srv://user:user@cluster0.pceid.mongodb.net/<dbname>?retryWrites=true&w=majority';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const taskSchema = new Schema({
  item: {
    type: String,
    required: true,
  },
  created_at1: {
    type: Date,
    default: Date.now(),
  },
});
const Task = mongoose.model('tasks', taskSchema);

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

module.exports = Task; // <-- export your model
