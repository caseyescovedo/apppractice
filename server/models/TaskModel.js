// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
// const myURI = '';
const mongoose = require('mongoose');
// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;
const MONGO_URI =
  'mongodb+srv://admin-meng:h0Sq9hbaG1LT95Iw@cluster0.m7nvw.mongodb.net/Cluster0?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    dbName: 'practice',
  })
  .then(() => console.log('Connected to Mongo DB'))
  .catch((err) => console.log('error happened on mongoose', err));

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  todo: [{ title: String, created_at: Date }],
});

const User = mongoose.model('user', userSchema);

module.exports = User; // <-- export your model
