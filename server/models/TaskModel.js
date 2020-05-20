// const mongoose = require('mongoose');
const {Pool} = require('pg')

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
// const myURI = 'mongodb+srv://Henri:<password>@cluster0-jlvbm.mongodb.net/test?retryWrites=true&w=majority';
const myURI = 'postgres://uxixrjri:UVJf63BXaBwEbWuePoR0Px3khegToYHJ@drona.db.elephantsql.com:5432/uxixrjri';


// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const pool = new Pool({
    connectionString: URI,
})

// mongoose.connect(URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     dbName: 'Tasks',
//   })
//   .then(()=>console.log('Connected to database.'))
//   .catch(err=>console.log("WTF", err));
  
//   const Schema = mongoose.Schema;

//   const taskSchema = new Schema({
//     item: String,
//     created_at: { type: Date, default: Date.now},
//   })
  
//   const Task = mongoose.model('Task', taskSchema);


// module.exports = { 
//     Task,
// }; // <-- export your model

module.exports = {
    query: (text, params, callback) => {
        console.log('executed query: ', text);
        return pool.query(text, params, callback);
    }
}
