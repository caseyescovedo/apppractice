const mongoose = require('mongoose');

const { Schema } = mongoose;

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'mongodb+srv://edkchow:hkHCOaA3hGgj0A5Y@cluster0-1bozk.mongodb.net/assessment?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, })
  .then(() => console.log('connected to mongodb...'))
  .catch((err) => console.log('error connecting to mongodb: ', err));

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

const taskSchema = new Schema(
  {
    item: { type: String, required: true, },
  },
  {
    timestamps: { createdAt: 'created_at' },
  },
);

module.exports = mongoose.model('task', taskSchema); // <-- export your model
