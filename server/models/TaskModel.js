const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  item: String,
}, { timestamps: { createdAt: 'created_at' } });

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'mongodb+srv://taylor:suS83LJM3bFSaFzv@cluster0-fligo.mongodb.net/test?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;
mongoose
  .connect(myURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'codesmith-grad-assessment'
  })
  .then(() => console.log('Connected to Mongo DB....'))
  .catch(err => console.log(err));

const Task = mongoose.model('Task', taskSchema);

module.exports = Task; // <-- export your model

