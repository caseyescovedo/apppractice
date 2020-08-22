const mongoose = require('mongoose');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'mongodb+srv://qwen:qwen@crud.ngs4p.mongodb.net/crud?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;


//Uses mongoose to connect my database to my application
mongoose.connect(myURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//Notifies administrator the application was successfully connected
mongoose.connection.once('open', () => {
    console.log('Connected to database.');
});


// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;


//Set up Task Schema for to store collections in database
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    item: { type: String, required: true },
    date: { type: Date, default: Date.now }
});


//Export Task Schema
module.exports = mongoose.model('Task', taskSchema); // <-- export your model
