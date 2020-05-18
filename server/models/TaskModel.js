var mongoose = require('mongoose');
var { Schema } = mongoose;

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
// Please put the URI of the database you will be using (local or cloud hosted) in the myURI variable.
const myURI = 'mongodb+srv://dbTommy:90-0250th@cluster0-nf8sn.mongodb.net/test?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;
mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true}, function(error){
    if (error) console.log(error);
    console.log("db connected successfully");
});

// All items in the database must have a property item which is a string
var taskSchema = new Schema({
    item: { 
      type: String,
      required: [true, 'Why no item?']
    },
    createdAt: { type: Date, default: Date.now }
  });

// Additionally, all items should be stored with the time they were created_at. This should default to the current time
taskSchema.pre('save', function(next){
    now = new Date();
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});

var Task = mongoose.model('task', taskSchema);

module.exports = {
    Task
} // <-- export your model
