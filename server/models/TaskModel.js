const mongoose = require("mongoose");

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = '';

// UNCOMMENT THE LINE BELOW IF USING MONGO
 const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;
const connectDB=()=>{
  mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }).then(()=>console.log('connected')).catch(err=>console.log('ERRRR',err))
}

let schema = new mongoose.Schema({
  item:{type: String, required:true}, 
  created_at:{type: Date, default: Date.now}
});

connectDB();
module.exports = mongoose.model('Task', schema); // <-- export your model
