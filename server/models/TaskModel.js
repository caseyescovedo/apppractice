const mongoose = require('mongoose');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'mongodb+srv://123:123@cluster0.subpv.mongodb.net/<dbname>?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

//connect mongodb to mongoose
mongoose.connect(
  URI,
  {useNewUrlParser: true, useUnifiedTopology: true})
  .then((console.log('Connection to mongodb was succesful')))
  .catch((err) => console.log(err));

// defining the schema 
const taskSchema = mongoose.Schema({
  item: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
})

//naming the collection
const Tasks = mongoose.model('Taks', taskSchema);

module.exports = Tasks; // <-- export your model
