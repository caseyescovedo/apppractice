const mongoose = require('mongoose');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = '';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

const connectDB = () => {
  mongoose
    .connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() =>
      console.log(
        'Connected to Mongodb instance & ready to receive connections'
      )
    )
    .catch((err) => console.log(err));
};

const TasksSchema = mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const Tasks = mongoose.model('tasks', TasksSchema);

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

module.exports = {
  connectDB,
  Tasks,
}; // <-- export your model
