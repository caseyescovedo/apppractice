// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
// replace myURI before commit
const myURI = "mongodb+srv://jhm304:h8XOkCx84@cluster0-s4vct.mongodb.net/test?retryWrites=true&w=majority";

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

const mongoose = require('mongoose');

mongoose.connect(myURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to Mongo.'))
  .catch(err => console.log('Error while connecting to Mongo:', err));

const taskSchema = new mongoose.Schema({
  item: {
    type: String, 
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});





module.exports = mongoose.model('task', taskSchema); // <-- export your model
