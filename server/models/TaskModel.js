const mongoose = require('mongoose');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'mongodb+srv://violet:ilovetesting@cluster0-fpdoy.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(myURI,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName:'task'
})
.then(() => console.log('Connected to Mongo DB Message Forum'))
 .catch(err=> console.log(err));
// UNCOMMENT THE LINE BELOW IF USING MONGO
const Schema = mongoose.Schema;
// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;
const taskSchema = new Schema({
  item: { type: String, required: true},
  created_at: {  type: Date, default: Date.now() }
});

const Task = mongoose.model('task',taskSchema)
module.exports = Task;
