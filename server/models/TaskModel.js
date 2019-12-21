const mongoose = require("mongoose");

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI =
  "mongodb+srv://max:maxpass@cluster0-dpmfw.mongodb.net/test?retryWrites=true&w=majority";

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

mongoose
  .connect(myURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "assessment2"
  })
  .then(() => console.log("Connected to Mongo DB."))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  item: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

const Task = mongoose.model("task", taskSchema);

module.exports = {
  Task
}; // <-- export your model
