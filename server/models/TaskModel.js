const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

require('dotenv').config()
// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
// const myURI = '';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

mongoose.connect(URI, {
  useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
  dbName: 'todo'
})
.then(()=>console.log('Connected to Mongo DB.'))
.catch(err=>console.log(err));

// Rather than having a Task Model, the task should be an
// array property of User because everyone's Task should be
// different.

const userSchema = new Schema({
  username: {
		type: String,
		required: true,
		unique: true
	},
  password: {
		type: String,
		required: true
	},
	tasks: [String],
});



userSchema.pre('save', function(next) {
	// generate a salt
	console.log("in")
	bcrypt.genSalt(10, (err, salt) => {
		if (err) return next(err);
		bcrypt.hash(this.password, salt, (err, hash) => {
			if (err) return next(err);
			this.password = hash;
			next();
		});
	});
})

userSchema.methods.compare = function(password, callback) {
	bcrypt.compare(password, this.password, (err, isMatch) => {
		if(err) return callback(err)
		callback(null, isMatch);
	})
}

const User = mongoose.model('user', userSchema);



// uncomment the below to seed the data base with testUser
// let testUser = new User({
// 	username: 'codesmith',
// 	password: 'ilovetesting'
// })

// testUser.save((err) => {
// 	if(err) throw err;
// })

// User.findOne.tasks.push("drink")
// testUser.save((err) => {
// 	if(err) throw err;
// })
// async function seed() {
// 	// let user = await User.findOneAndUpdate({ username: "codesmith" }, { $push: { tasks: "something" }})
// 	// await	user.save()
// }

// seed()

// exports all the models in an object to be used in the controller
module.exports = { User }  // <-- export your model