const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = `mongodb+srv://Vika:myfinalassessment@cluster0.apjbd.mongodb.net/ToDoApp?retryWrites=true&w=majority`;

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

mongoose
	.connect(URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		dbName: 'ToDoApp'
	})
	.then(() => console.log('Connected to Mongo DB'))
	.catch((err) => console.log(err));

const TaskSchema = new Schema({
	item: String,
	created_at: {
		type: Date,
		default: Date.now()
	}
});

const Tasks = mongoose.model("Tasks", TaskSchema);
module.exports = Tasks; // <-- export your model
