const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = '';
// mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

mongoose.connect(URI);
mongoose.connection.once('open', () => {
  console.log('Connected to Mongo Database');
});

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

const taskSchema = new Schema({
  item: { 
    type: String, 
    required: true,
  },
  created_at: { 
    type: Date, 
    expires: 70000000000000, 
    default: Date.now 
  }
});


module.exports = mongoose.model('Task', taskSchema); // <-- export your model
