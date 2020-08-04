const mongoose = require('mongoose');
// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI =
  'mongodb+srv://seanhav:rtf312@cluster0.bgjjm.mongodb.net/assessment?retryWrites=true&w=majority;';
// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    dbName: 'assessment'
  })
  .then((data) => data)
  .catch((err) => console.log(err));

mongoose.connection.once('open', () => {
  console.log('MongoDB database connection establised successfully');
});

// mongoose.connection.once('open', () => {
//   console.log('MongoDB database connection establised successfully');
// });

const { Schema } = mongoose;

const tasksSchema = new Schema({
  item: { type: String, required: true }
  // created_at: { type: Date, default: true }
});

const Tasks = mongoose.model('tasks', tasksSchema);

module.exports = {
  Tasks
}; // <-- export your model

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;
