const mongoose = require('mongoose');

// Use Codesmith URI or personal URI, depending on env-vars available
const URI = process.env.MONGO_URI || process.env.MY_URI;

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) =>
  console.log(err || 'Connected to MongoDB'),
);

const { Schema } = mongoose;

const taskSchema = new Schema({
  item: { type: String },
  // Date.now seems to default to GMT, with no locale offset
  created_at: { type: Date, default: Date.now },
});

const Task = mongoose.model('task', taskSchema);

module.exports = Task;
