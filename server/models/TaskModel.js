// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI

const mongoose = require('mongoose');
const myURI = 'mongodb+srv://egrobar:test1@cluster0-3lvcg.mongodb.net/test?retryWrites=true&w=majority';
// const connection = mongoose.createConnection(myURI)
mongoose.connect(myURI, { useNewUrlParser: true , dbName: 'taskMaker'});

const db = mongoose.connection;
db.on("error", () => {
    console.log("> error occurred from the database");
});
db.once("open", () => {
    console.log("> successfully opened the database");
});

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;
const taskSchema = new mongoose.Schema({ item: 'string'}, { timestamps: { createdAt: 'created_at' } } );
const Task = mongoose.model('tasks', taskSchema)


module.exports = Task; // <-- export your model
