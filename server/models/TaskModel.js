const mongoose = require('mongoose');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'mongodb://127.0.0.1:27017/Task';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

mongoose.connect(
	URI,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		dbName: 'Task',
	},
	(err) => {
		if (!err) console.log('MongoDB Connection Succeeded');
	}
);

const tasksSchema = new mongoose.Schema({
	item: { type: String, required: true },
	created_at: { type: Date, default: Date.now },
});

const Task = mongoose.model('task', tasksSchema);

module.exports = Task; // <-- export your model
