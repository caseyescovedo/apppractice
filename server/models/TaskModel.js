const mongoose = require('mongoose');

const { Schema } = mongoose;
// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
// const myURI = ''; <--- using my own .env file to store database information
const URI = process.env.MONGO_URI;
mongoose.connect(URI, { useNewUrlParser: true }, () => console.log('connectd to mongoDB'));

const taskSchema = new Schema({
  item: String,
  created_at: String,
});


module.exports = mongoose.model('Task', taskSchema); // <-- export your model
