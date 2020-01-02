const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'mongodb+srv://jourdanworld:Stardust_2@cluster0-0sryl.mongodb.net/test?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

    dbName: "ToDo"
})
.then(() => console.log('Connected to Mongo.'))

const taskSchema = new Schema({
    task: String,
    created_at: {type: Date, default: Date.now()}
});

const Task = mongoose.model('task', taskSchema);


module.exports = { Task }; // <-- export your model
