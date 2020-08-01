const mongoose = require("mongoose");
const myURI =
  "mongodb+srv://hienqnguyen:codesmith@cluster0.gke0s.mongodb.net/task?retryWrites=true&w=majority";
// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

try {
  mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log("Connected to the database.");
} catch (error) {
  console.log(error);
}

const taskSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  created_at : {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("Tasks", taskSchema); // <-- export your model
