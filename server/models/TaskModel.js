// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'mongodb+srv://aku:admin@cluster0-tgqd3.gcp.mongodb.net/test?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'grad-app'
  })
  .then(() => console.log('Connected to Mongo DB....'))
  .catch(err => console.log(err));

const taskSchema = new Schema ({
  item: String,
  created_at: {type: Date, default: Date.now()}
})

const Task = mongoose.model('task', taskSchema)


module.exports = Task; // <-- export your model
