const mongoose = require('mongoose');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'mongodb+srv://sara:sara@assessment-cluster-aogyj.mongodb.net/Assessment?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;
mongoose.connect(myURI, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));

db.once('open', () => { console.log('connected to Mongo')});

const TaskSchema = new mongoose.Schema({
    item: String,
    // created_at: { type: Date, default: Date.now() },
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task; // <-- export your model
