const mongoose = require('mongoose');

const myURI = 'mongodb+srv://helloworld:helloworld@cluster0-qnbgm.mongodb.net/test?retryWrites=true&w=majority';
const URI = process.env.MONGO_URI || myURI;
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log('Error while connecting to Mongo', err))

const taskSchema = new mongoose.Schema({
  item: { 
    type: String, 
    required: true 
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;