// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'mongodb+srv://chenchingk:mongodbpassword@cluster0.wsin8.mongodb.net/toDoList?retryWrites=true&w=majority';

const mongoose = require('mongoose')
// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// mongoose.connect(URI) {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   .then(() => console.log('database connected'))
//   .catch((err) => console.log(err));
// }

mongoose
  .connect(URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'to-do-list',
  })

const taskSchema = new mongoose.Schema({
  item: { type: String, required: true},
  created_at: {type: Date, default: Date.now }
})

const Task = mongoose.model('Task', taskSchema)
module.exports = Task; // <-- export your model
