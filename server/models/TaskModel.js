const mongoose = require('mongoose');
require('dotenv').config();

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = process.env.DATABASE_URI;

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

// connect to db
mongoose.connect(myURI, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });

// connect to db and store connection to a variable
const db = mongoose.connection;
// db connection error handling
db.on('error', console.error.bind(console, 'DB connection error'));

// successful db connection
db.once('open', () => {
  console.log('DB Connection Successful!');
});

const TaskSchema = new mongoose.Schema(
  {
    item: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Task = mongoose.model('Task', TaskSchema);

module.exports = { Task, db };
