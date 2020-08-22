const mongoose = require('mongoose');

const { Schema } = mongoose;
// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'mongodb+srv://guest:12345@origin-cluster.1hwlx.mongodb.net/assessment?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

mongoose.connect(URI, { useNewUrlParser: true })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const taskSchema = new Schema({
  item: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Task', taskSchema);
