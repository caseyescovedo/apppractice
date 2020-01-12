const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI =
  "mongodb+srv://linda:wish@cluster0-ydchz.mongodb.net/test?retryWrites=true&w=majority";

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

// connect to Mongo
mongoose
  .connect(myURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "Task"
  })
  .then(() => console.log("connected to MONGODB!!!"))
  .catch(err => console.log(err));

// set schema for to-do list collection
const TodoSchema = new Schema({
  item: {
    type: String,
    require: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// create model for to-do list
const ToDo = mongoose.model("todo", TodoSchema);

module.exports = ToDo;
