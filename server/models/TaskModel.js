const mongoose = require('mongoose');
const taskController = require('../controllers/taskController');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'mongodb+srv://testboy:rhino@crud-app.w15ez.mongodb.net/task?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;
// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;
mongoose
    .connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        dbName: 'codesmith',
    })
    .then(() => console.log('Connected to Mongo DB'))
    .catch((err) => console.log('error happened on mongoose', err));
var Schema = mongoose.Schema;
var taskSchema = new Schema({
    item: String,
    created_at: Date
});
var Task = mongoose.model('task', taskSchema);
module.exports = Task; // <-- export your model
