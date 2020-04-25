const mongoose = require('mongoose');

// establshing DB connection 
const myURI = 'mongodb+srv://tshen815:Google.com3420!@graduation-assesment-db-jmva0.mongodb.net/test?retryWrites=true&w=majority';
const URI = process.env.MONGO_URI || myURI;

mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection
    .then(() => console.log('Succesfully connected to DB'))
    .catch((err) => console.log('There has been an error: ', err))

// schema set for creating a new item for our DB    
const taskSchema = new mongoose.Schema({
    item: {type: String, required: true},
    created_at: {type: Date, default: Date.now}
})




module.exports = mongoose.model('item', taskSchema); // <-- export your model
