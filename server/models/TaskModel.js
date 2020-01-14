// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI

//FusDFMXrhQllDL07
//mongodb+srv://dbAdmin:FusDFMXrhQllDL07@cluster0-1fevh.mongodb.net/test?retryWrites=true&w=majority
const myURI = 'mongodb+srv://dbAdmin:FusDFMXrhQllDL07@cluster0-1fevh.mongodb.net/test?retryWrites=true&w=majority';
const mongoose = require('mongoose');
mongoose.connect(myURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
})
  .then((data) => {console.log(`DB connection secured: ${data}`)})
  .catch(e => {console.log(`Error on db connection: ${e}`)});

const Schema = mongoose.Schema;
const taskSchema = new Schema({
  item: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});


// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;




module.exports = mongoose.model('Task', taskSchema); // <-- export your model
