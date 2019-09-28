const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'mongodb+srv://assessment:123@nodeproject-o98p0.mongodb.net/test?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;
mongoose.connect(URI);

const TaskSchema = new Schema({
  item: {type: String, require: true},
  created_at: {type: Date, default: Date.now}
})

const Task = mongoose.model('Task', TaskSchema)


module.exports = Task; // <-- export your model
