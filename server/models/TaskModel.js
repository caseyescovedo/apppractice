const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config(path.resolve(__dirname, '../../.env'));

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI;

// connect to mongo database
mongoose
  .connect(URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'Todo',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

//define Task schema
const taskSchema = new Schema({
  item: { type: String, required: true },
  created_at: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('task', taskSchema); // <-- export your model
