// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;


const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

const myURI = 'mongodb+srv://bradleyDB:kiroismypartner@cluster0-klwdv.mongodb.net/test?retryWrites=true&w=majority';
const URI = process.env.MONGO_URI || myURI;
const Schema = mongoose.Schema;

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "AssessmentPt2"
})
.then(() => console.log(`Connected to Mongo DB`))
.catch(err => console.log(err));

const TaskSchema = new Schema({
    item: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
})

const Task = mongoose.model('task', TaskSchema);

module.exports = Task;
