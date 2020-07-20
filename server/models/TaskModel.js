//import mongoose requirements
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
//create variable for URI to database
const myURI = "mongodb://127.0.0.1:27017/task";

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

//mongoose connection initialized
mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to THE MongoDB"))
  .catch((err) => console.log(err));

//Schema design for to-do list items
const taskSchema = new Schema({
  //add property item that has a string value
  item: { type: String, required: true },
  //add property for time created
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Tasks", taskSchema); 
