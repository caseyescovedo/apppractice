const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = `mongodb+srv://${process.env.PASSWORD}@todo-kdwwa.mongodb.net/test?retryWrites=true&w=majority`;

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to ToDo database");
  })
  .catch((err) => {
    console.log(`Error in connecting to ToDo database: ${err}`);
  });

const schema = new mongoose.Schema({
  item: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

const Task = mongoose.model("Task", schema);

module.exports = Task; // <-- export your model
