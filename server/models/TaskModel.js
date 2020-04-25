// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const mongoose = require('mongoose');

// const myURI = ;

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

const taskSchema = new mongoose.Schema({
  item : { type: String, required: true },
  created_at : { type: Date, default: Date.now }
})

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;




module.exports = mongoose.model('Tasks', taskSchema); // <-- export your model
