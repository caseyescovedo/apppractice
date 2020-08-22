const mongoose = require('mongoose');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI =
  'mongodb+srv://michaellauri:iWVO3BtIlwHPjcOB@cluster0.8jiwx.mongodb.net/app-assessment?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

mongoose
  .connect(myURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Now connected to mongoDB'));

const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    item: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: { createdAt: 'created_at' },
  }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task; // <-- export your model
