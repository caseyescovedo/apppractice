// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI

const mongoose = require('mongoose')

const myURI = 'mongodb+srv://steven:steventodo@cluster0.k40w5.mongodb.net/toDo?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('connected to MongoDB'))
.catch((err) => console.log(err));

const taskSchema = new mongoose.Schema({
  item: {type: String, required: true},
  created_at: {type: Date, default: Date.now}
})

module.exports = mongoose.model('task', taskSchema)
