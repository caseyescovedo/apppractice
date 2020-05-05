const mongoose = require ('mongoose')
const Schema = mongoose.Schema


// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'mongodb+srv://Duygu:Codesmith@cluster0-76tl3.mongodb.net/test?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

const TasksSchema = new Schema ({
    item: { type: String }, 
    created_at: {
        type: Date, 
        default: Date.now
    }
})

mongoose.connect(URI)
mongoose.connection.once('open', () => {
    console.log('Connected to Database')
})

module.exports = mongoose.model('Tasks', TasksSchema); // <-- export your model
