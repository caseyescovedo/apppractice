// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'mongodb+srv://Codesmith:ilovetesting@cluster0-di6an.mongodb.net/test?retryWrites=true&w=majority';;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

// connect to mongoDB
mongoose.connect(myURI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', function(){  
  console.log(`Connected to MongoDB Atlas`);
});
mongoose.connection.on('error', function(err){
  console.log(`Error connecting to MongoDB`);
});

// create the task schema
const taskSchema = new Schema({
  item: { type: String, required: true},
  created_at: { type: Date, requried: false, default: Date.now()}
})

// create the Task model
const Task = mongoose.model('Task', taskSchema);

// export model
module.exports = Task; // <-- export your model
