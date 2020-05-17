const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');

const PORT = 3333;

const app = express();

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'mongodb+srv://Henri:<password>@cluster0-jlvbm.mongodb.net/test?retryWrites=true&w=majority';


// UNCOMMENT THE LINE BELOW IF USING MONGO
const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
// const URI = process.env.PG_URI || myURI;

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'Tasks',
  })
  .then(()=>console.log('Connected to database.'))
  .catch(err=>console.log("WTF", err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "../assets")));
app.get('/', (req, res) => res.status(200).sendFile(path.resolve(__dirname, '../views/index.html')));
app.get('/secret', (req, res) => res.status(200).sendFile(path.resolve(__dirname, '../views/secret.html')));
app.get('/getTasks', taskController.getTasks, (req, res, next) => {
    res.status(200).json(res.locals.tasks);
});
app.post('/postTask', taskController.postTask, (req, res, next) => {
    res.status(200).json(res.locals.task);
})

app.listen(PORT, ()=>{ console.log(`Listening on port ${PORT}...`); });

module.exports = app;