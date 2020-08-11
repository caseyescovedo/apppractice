const mongoose = require('mongoose');

const { Schema } = mongoose;

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'mongodb+srv://exquizzle:admin@clusterzero-acjrx.mongodb.net/GradAppAssessment';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

// standard database connection template:
mongoose.connect(URI, { useNewUrlParser: true });
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => {
  console.log('Connected to Mongo Database');
});


const taskSchema = new Schema({
  item: { type: String, required: true },
  created_at: { type: Date, default: Date.now() },
  // using Date.now() puts the create_at property above password in the return obj..
  // created_at: { type: String }, // guess the date object has to be dealt with in the front end
},
{ collection: 'Task' }); // this collection argument was supposed to change collection name
// but it has no effect...
// OH NVM it worked!!! has to redo NPM start dev to take effect...



module.exports = mongoose.model('Task', taskSchema, 'Task'); // <-- export your model
