const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'mongodb+srv://justinjaeger:ratinthehat@cluster0.jznd2.mongodb.net/Cluster0?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

mongoose
  .connect(myURI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'Cluster0', // sets the name of the DB that our collections are part of
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));


const task = new Schema({
  item: String,
  createdAt: String
});

const Task = mongoose.model('task', task); // declare after every new schema

module.exports = { Task }