// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'mongodb+srv://chenchingk:mongodbpassword@cluster0.wsin8.mongodb.net/Tasks?retryWrites=true&w=majority';

const mongoose = require('mongoose')
// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

mongoose.connect(URI)
.then(() => console.log('database connected'))
.catch((err) => console.log(err));

const taskSchema = new mongoose.Schema({
  item: { type: String},
  created_at: {type: Date, default: Date.now }
})

const Task = mongoose.model('Task', taskSchema)
module.exports = Task; // <-- export your model
