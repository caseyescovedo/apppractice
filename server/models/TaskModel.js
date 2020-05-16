// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI =
'mongodb://lindaeverswick:9srTQJzd2rUyonpb@cluster0-k8tka.mongodb.net/test?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const db = mongoose.connection;
mongoose.connect(URI, {useNewUrlParser: true});

const taskSchema = new Schema({
  item: {type: String, required: true},
  created_at: {type: String, required: true},
})

const Task = mongoose.model('Task', taskSchema);



db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to db')
});

console.log('hello')
module.exports = { Task }; // <-- export your model
