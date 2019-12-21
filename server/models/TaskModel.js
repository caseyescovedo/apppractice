const mongoose = require('mongoose');
// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'mongodb+srv://andrewsnap:lol@cluster0-vpsa9.mongodb.net/test?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;
mongoose.connect(myURI, {useNewUrlParser: true,  useUnifiedTopology: true});

const Schema = mongoose.Schema;

const tasksSchema = new Schema({
    item: { type: String, required: true },
    create_at: { type: Date, default: Date.now() } 
})

const Task = mongoose.model('Tasks', tasksSchema)

module.exports = Task; // <-- export your model
