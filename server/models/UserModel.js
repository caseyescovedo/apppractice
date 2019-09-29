const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'mongodb+srv://assessment:123@nodeproject-o98p0.mongodb.net/test?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;
mongoose.connect(URI);

const UserSchema = new Schema({
  username: {type: String, require: true},
  password: {type: String, require: true}
})

const Users = mongoose.model('User', UserSchema)


module.exports = Users; // <-- export your model
