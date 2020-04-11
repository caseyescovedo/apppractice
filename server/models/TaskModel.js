const mongoose = require("mongoose");
const { Schema } = mongoose;
// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI =
  "mongodb+srv://anthonydb:NdLN7TzjiIWmUPlm@cluster0-mrkc7.mongodb.net/test?retryWrites=true&w=majority";

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

mongoose
  .connect(myURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "app2",
  })
  .then(() => console.log("Connected to Mongo DB"))
  .catch((err) => console.log(`Error: ${err}`));

const taskSchema = new Schema({
  item: { type: String },
  created_at: { type: Date, default: Date.now() },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task; // <-- export your model
