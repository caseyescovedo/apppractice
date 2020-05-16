// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const mongoose = require('mongoose');
const myURI = 'mongodb+srv://lpham598:lp576702@cluster0-e8abe.mongodb.net/test?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;
mongoose.connect(myURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'Todo'
})
.then(console.log('In MongoDB'));


const Schema = mongoose.Schema;

// const userSchema = new Schema({
//     username: {type: String, required: true, unique: true},
//     password: {type: String, required: true}
// })

// const User = mongoose.model('user', userSchema);

const taskSchema = new Schema({
  item: String,
  created_at: {type: Date, default: Date.now}
})


const Task = mongoose.model('task', taskSchema);
module.exports = Task;
