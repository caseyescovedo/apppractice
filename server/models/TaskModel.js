const mongoose = require('mongoose');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'mongodb+srv://anthony:asdasd@cluster0.46p4v.mongodb.net/<dbname>?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

// ! Connecting tho the database
mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true}) // connecting to database and getting rid of deprecated errors
.then(() => console.log('connected to MongoDB Database'))
.catch((err) => console.log(err))




// ! Creating the schema ofr each task -- must have item and time created at
const taskSchema = new mongoose.Schema({
  item: {type: String, required: true},
  created_at: { type: Date, default: Date.now}
})

const Task = mongoose.model('item', taskSchema)



module.exports = Task; // <-- export your model
