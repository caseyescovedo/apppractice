// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'mongodb+srv://codesmith123:bonjay123@assessment.da6rd.mongodb.net/assessmentDB?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

//I am confused, shouldn't I also connect to the database? Not seeing this in the readme at this step.

const mongoose = require('mongoose');

const Task = new mongoose.Schema({
    item : {type: String, require: true},
    date : {type: Date, default: Date.now}
})

module.exports = mongoose.model('Task', Task); // <-- export your model
