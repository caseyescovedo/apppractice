const mongoose = require('mongoose');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'mongodb+srv://tizmo240:ggmz6L7j@cluster0-eortf.mongodb.net/test?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO  
const URI = process.env.MONGO_URI || myURI

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

mongoose.connect(URI)
  .then(() => console.log('Connected to Mongo DB'))
  .catch(err => console.log('Error Connecting to DB', err))


  const taskSchema = new mongoose.Schema({
    item: {
      type: String,
      // required: true,
    },
    created_at: {
      type: Date,
      default: Date.now
    }
  });



module.exports = mongoose.model('task', taskSchema); // <-- export your model
