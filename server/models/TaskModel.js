// In the `server/models/TaskModel.js` file, implement a database in either MongoDB
//  or PostgresQL (Mongoose/Sequelize optional) as described below:
// - [ ] We want to store our data in a collection/table called `Task`. (Remember,
//      this may be created as the plural `Tasks` - that is fine.)
// - [ ] All items in the database must have a property `item` which is a string
// - [ ] Additionally, all items should be stored with the time they were
// `created_at`. This should default to the current time
const mongoose = require('mongoose');

const { Schema } = mongoose;
// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI =
  'mongodb+srv://elizabeth:codesmith@cluster0-boglz.mongodb.net/test?retryWrites=true&w=majority';
// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

mongoose
  .connect(myURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected'))
  .catch(err => console.log(err));

const Tasks = new Schema({
  item: { type: String },
  date: { type: Date, default: Date.now },
});

const Model = mongoose.model('task', Tasks);

module.exports = Model; // <-- export your model
