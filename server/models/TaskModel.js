const mongoose = require('mongoose');

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'mongodb+srv://Joon:666kkk@cluster0.wtwwe.mongodb.net/Cluster0?retryWrites=true&w=majority';

// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

const connectDB = async () => {
  await mongoose.connect(myURI, {
    useUnifiedTopology: true, 
    useNewUrlParser: true, 
  })
  console.log('DB connected');
}

module.exports = connectDB;