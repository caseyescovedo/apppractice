const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'mongodb+srv://keith:keith123@cluster0-4kdlf.mongodb.net/test?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

// connect to database
mongoose
  .connect(myURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "assess"
  })
  .then(() => console.log("Connected to Mongo DB."))
  .catch(err => console.log(err, "connect err"));

// create the shema
const taskSchema = new Schema({
  item: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;