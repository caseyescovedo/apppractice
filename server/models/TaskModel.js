const mongoose = require('mongoose');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = '';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// connect to our DB
mongoose.connect(URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

// create a task schema
const taskSchema = new mongoose.Schema(
  {
    item: {
      type: String,
      required: true,
      trim: true
    }
  },
  { timestamps: { createdAt: 'created_at' } }
);

// turn task schema into a Model
const Task = mongoose.model('Task', taskSchema);

module.exports = Task; // <-- export your model
