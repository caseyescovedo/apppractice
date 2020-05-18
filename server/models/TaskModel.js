const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const myURI = 'mongodb+srv://horatiu:waterbottle@gradcluster-2hq79.mongodb.net/test?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// Added useUnifiedTopology due to this warning in the terminal:
/*
DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. 
To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
*/

mongoose.connect(URI, { useNewUrlParser: true , useUnifiedTopology: true}, () => {
    console.log('Connected to Mongo!!!!!!!')
})

// Creating schema with item being a string and created_at being the time now
const itemSchema = new Schema({
    item: {
        type: String,
        created_at: Date.now
    }
});

// Creating model:
const Task = mongoose.model('Task', itemSchema);

module.exports = {
    Task
}

