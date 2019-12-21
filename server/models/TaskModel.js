// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'mongodb+srv://violet:ilovetesting@cluster0-fpdoy.mongodb.net/test?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
 const URI = process.env.MONGO_URI || myURI;
const Schema = mongoose.Schema;
// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;
const taskSchema = new Schema({
  item: String,
  createdAt: {  type: Date, expires: 36000000, default: Date.now }
});


module.exports = mongoose.model('Task',taskSchema); // <-- export your model
