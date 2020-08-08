// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
//const myURI = '';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

const mongoose = require('mongoose');
const uri = 'mongodb+srv://philip:bubby@cluster0.b2wdh.mongodb.net/Cluster0?retryWrites=true&w=majority';

mongoose.connect('mongodb+srv://philip:bubby@cluster0.b2wdh.mongodb.net/Cluster0?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('Connected to MongoDB');
});


const taskSchema = new mongoose.Schema({
    item: String
    //created_at: Date;
})

const Task = mongoose.model('Task', taskSchema);



module.exports = Task; // <-- export your model
