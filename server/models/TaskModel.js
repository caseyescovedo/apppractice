const mongoose = require('mongoose');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'mongodb+srv://username:sOYtKTrK23AG6GBd@cluster0.j5gpu.mongodb.net/Cluster0?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Sucessfully connected to MongoDB'))
  .catch((err) => console.log(err));

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

const { Schema } = mongoose;

const taskSchema = new Schema({
  item: { type: String, required: true },
  created_at: { type: Date, required: true, default: Date.now },
});

const Task = mongoose.model('task', taskSchema);

module.exports = Task; // <-- export your model
