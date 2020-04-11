// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const mongoose = require("mongoose");

const myURI =
  "mongodb+srv://noahking:pipking1@cluster0-7jups.mongodb.net/test?retryWrites=true&w=majority";

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "Task",
  })

  .then(() => {
    console.log("Connected to mongo...");
  })
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

const Tasks = new Schema({
  item: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model("Task", Tasks);



module.exports = Task; // <-- export your model
