const mongoose = require('mongoose');
// #### Task Model
// In the`server/models/TaskModel.js` file, implement a database in either MongoDB or PostgresQL
//     (Mongoose / Sequelize optional) as described below:



//-[x] We want to store our data in a collection / table called`Task`. 
// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'mongodb+srv://zavagezong:31nst31n@cluster0-xlrwh.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(myURI, {
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'Task'
}).then(() => console.log("Connected to MongoDB")).catch(err => console.log(err));
// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;


const Schema = mongoose.Schema;
// -[] All items in the database must have a property`item` which is a string
//     - [] Additionally, all items should be stored with the time they were`created_at`.
// This should default to the current time

const taskSchema = new Schema({
    item: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

const Task = mongoose.model('Task', taskSchema)


module.exports = Task; // <-- export your model
