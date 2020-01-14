const mongoose = require('mongoose');
// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'mongodb+srv://phonores:ilovetocode@cluster0-9bnj0.mongodb.net/test?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'assesment'
})
.then(() => console.log('Connected to MongoDB..'))
.catch((err) => console.log(err));

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  item: {
    type: String,
    required: true,
  }, 
  created_at: {
    type: Date,
    required: true,
  }
});

module.exports = mongoose.model('Task',taskSchema); // <-- export your model
