const mongoose = require('mongoose');


// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'mongodb+srv://admin:admin@codesmith.js1u3.gcp.mongodb.net/test?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

  })


const TaskSchema = new mongoose.Schema({
    item: { type: String, required: true },
    created_at: { type: Date, default: Date.now}
});


module.exports = mongoose.model('Task', TaskSchema);; // <-- export your model
