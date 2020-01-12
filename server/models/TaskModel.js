const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create a Task model
const TaskSchema = new Schema({
  item: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI =
  'mongodb+srv://lukepvb:12345@todo-kp5qx.mongodb.net/test?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;
// console.log(URI);

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

// So we are not supposed to connect to our database? This is confusing. I would usually create and export URI from a seperate folder
const Task = mongoose.model('task', TaskSchema);
// console.log(Task);

// module.exports = Task = mongoose.model('task', TaskSchema); // <-- export your model
module.exports = Task;
