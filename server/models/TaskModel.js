const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'mongodb://bradley:luna801@ds229771.mlab.com:29771/greatlist';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;


const taskSchema = new Schema({
    item: String,
    createdAt: {type: Date, default: Date.now}
});

const Task = mongoose.model("Task", taskSchema);


module.exports = Task; // <-- export your model
