// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = '';
const mongoose = require('mongoose')

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

const taskSchema = new mongoose.Schema({
    item: {type: string, require: true, unique: true},
    created_at: {type: string }
})

const Task = mongoose.model('task', taskSchema) 

module.exports = Task; // <-- export your model
