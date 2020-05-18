const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'mongodb+srv://keliphan:cs182020@gradprep-9lo30.mongodb.net/test?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

mongoose.connect(myURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(console.log('Connected to Mongo DB'))
  .catch(err => console.log(`Error occurred with Mongo DB: ${err}`))

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

const soloTask = new Schema({
  'item': String,
}, {
  timestamps: true
})

const Task = mongoose.model('Task', soloTask);


module.exports = Task; // <-- export your model
