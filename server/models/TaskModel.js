const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = ''; // deleted URI before submitting


// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;
mongoose.connect(URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB connection established successfully")
});


const Task = new Schema({
  item: {type: String, required: true},
  created_at: {type: Date, default: Date.now}
});



module.exports = mongoose.model('Task', Task); // <-- export your model
