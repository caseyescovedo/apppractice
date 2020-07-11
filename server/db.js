const mongoose = require('mongoose');

const { URI } = require('./models/TaskModel.js');

const connectDB = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('MongoDB is connected....');
  } catch (err) {
    console.log(err.message);
    process.exit();
  }
};

module.exports = connectDB;
