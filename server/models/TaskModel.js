const mongoose = require('mongoose');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'mongodb+srv://jhmoon999:final-assessment@cluster0-yqfcq.mongodb.net/test?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

// Connected my backend to my cloud-hosted MongoDB database
mongoose.connect(myURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'final-assessment-db'
})
.then(() => console.log('Connected to final-assessment-db in MongoDB'))
.catch((err) => console.log('Error connecting to MongoDB: ', err));

const Schema = mongoose.Schema;
// Created a schema for a collection of Tasks which will store my data
const taskSchema = new Schema({
    item: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Task', taskSchema); // <-- export your model
