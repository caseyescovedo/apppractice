const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI =
	'mongodb+srv://cameronfitz:blackjack123@cluster0-gsx0n.mongodb.net/messageboard?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

mongoose
	.connect(URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log('Connected to MongoDB'))
	.catch((error) => console.log(error));

const taskSchema = new Schema({
	item: String,
	created_at: {
		type: Date,
		default: Date.now
	}
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task; // <-- export your model
