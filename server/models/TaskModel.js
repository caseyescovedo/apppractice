const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const { Schema } = mongoose;
// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = process.env.MONGO_URI;

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'test',
})
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const TaskSchema = new Schema({
  item: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});


module.exports = mongoose.model('Task', TaskSchema); // <-- export your model
