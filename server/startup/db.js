/*
This module returns a function that, when called, connects to a provided
MongoDB
*/

const mongoose = require('mongoose');

const mongoUri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PW}@cluster0.xp5jr.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

const startDb = () => {
  mongoose
    .connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'gradAss',
    })
    .then(() => console.log('Connected to Mongo DB'))
    .catch((e) => console.log('Failed to connect to DB: ', e));
};

module.exports = startDb;
