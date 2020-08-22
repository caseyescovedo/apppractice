
const mongoose = require('mongoose')
// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI

const myURI = 'mongodb+srv://nikkkidew:12345@cluster0.00mjs.mongodb.net/task?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

mongoose
	.connect(myURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		dbName: 'task',
	})
	.then(() => console.log('Connected to Mongo DB'))
	.catch((err) => console.log('error happened on mongoose', err));

var Schema = mongoose.Schema;

var taskSchema = new Schema({
	username: { type: String, unique: true },
	password: { type: String },
	item: [{ title: String }],
	created_at: { type: Date, default: Date.now },
});

var Task = mongoose.model('task', taskSchema);

//--------------------
// var userSchema = new Schema({
// 	username: { type: String, unique: true },
// 	password: { type: String, }
// });

// var User = mongoose.model('user', userSchema);



module.exports = Task
// module.exports = User // <-- export your model
