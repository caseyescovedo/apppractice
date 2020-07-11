// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI =
  "mongodb+srv://mdigel:test@cluster0.pkvmr.mongodb.net/taskmanager?retryWrites=true&w=majority";

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect(myURI, {
  useNewUrlParser: true,
  dbName: "taskmanager"
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("Database connected");
});

db.on("error", () => {
  console.log("db connection error");
});

const TaskSchema = new Schema(
  {
    item: String
  },
  { timestamps: { createdAt: "created_at" } }
);

const Task = mongoose.model("Task", TaskSchema);

module.exports = { Task }; // <-- export your model
