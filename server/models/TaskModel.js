const mongoose = require('mongoose');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'mongodb+srv://rnobile:Mongo1234@cluster0.z24qy.mongodb.net/cs-assessment?retryWrites=true&w=majority';


// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

mongoose.connect(URI, { useNewUrlParser: true })
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err));


const Schema = mongoose.Schema;

const taskSchema = new Schema({
  item: { type: String, required: true },
}, { timestamps: { createdAt: 'created_at' } });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task; // <-- export your model
