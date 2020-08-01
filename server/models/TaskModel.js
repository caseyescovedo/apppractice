const mongoose = require('mongoose');
// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI =
  'mongodb+srv://justin:1234@assessment.1wein.mongodb.net/assessment?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

mongoose
  .connect(myURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'assessment',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const { Schema } = mongoose;

const taskSchema = new Schema({
  item: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

const tasks = mongoose.model('tasks', taskSchema);

module.exports = tasks; // <-- export your model
