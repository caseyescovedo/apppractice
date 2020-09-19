const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'mongodb+srv://akim:bankir1983@cluster0.lo2hn.mongodb.net/todolist?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

// connect to MongoDB
mongoose.connect(URI, {
  // options for the connect method to deal with deprecation warnings
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
.then(()=>console.log('Connected to MongoDB.'))
.catch(err=>console.log(err));

// sets a schema for the 'Tasks' collection
const itemSchema = new Schema({
  item: { type: String, required: true },
  created_at: { type: String, required: true },
});

module.exports = mongoose.model('Tasks', itemSchema);
