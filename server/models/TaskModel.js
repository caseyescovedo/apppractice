const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'mongodb+srv://user:user@cluster0.sl370.mongodb.net/test?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

mongoose.connect(URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'tasks',
}).then(() => console.log('Connected to Mongo DB.')).catch((err) => console.log(err));

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  item: { type: String, required: true },
  created_at: { type: Date, required: true },
});

taskSchema.plugin(mongoose_delete);

module.exports =  mongoose.model('Task', taskSchema); // <-- export your model
