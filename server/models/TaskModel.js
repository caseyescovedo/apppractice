const mongoose = require('mongoose');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = '';
// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI;

mongoose.connect(myURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) {
    console.log(err);
  } else console.log(`db connected!`);
});

const taskSchema = new mongoose.Schema({
  item: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Task', taskSchema);
