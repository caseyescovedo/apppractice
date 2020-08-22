const mongoose = require('mongoose');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'mongodb+srv://kadirgund:Werty123@cluster0.gdkc7.mongodb.net/assessment?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

mongoose.connect(URI, {
	// options for the connect method to parse the URI
	useNewUrlParser: true,
	useUnifiedTopology: true,
	// sets the name of the DB that our collections are part of
	dbName: 'assessment'
})
	.then(() => console.log('Connected to Mongo DB.'))
	.catch(err => console.log(err));

const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: { type: String, required: true, },
	password: { type: String, required: true }
})

const userModel = mongoose.model('user', userSchema)


module.exports = userModel; // <-- export your model
