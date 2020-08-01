const mongoose = require('mongoose');

const URI = process.env.MONGO_URI || process.env.MY_URI;

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) =>
  console.log(err || 'Connected to MongoDB'),
);

const { Schema } = mongoose;

const taskSchema = new Schema({
  item: { type: String },
  created_at: { type: Date, default: Date.now },
});

const Task = mongoose.model('task', taskSchema);

module.exports = Task;
