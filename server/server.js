const express = require('express');
const path = require('path');
const Task = require('../server/models/TaskModel');

const app = express();
const port = 3333;

// I tried to use the controller but was unsuccessful
// const taskController = require('../server/controllers/taskController');

// I'm not sure if I needed the router
// const router = express.Router();

app.use(express.json());

// Get static files
// I wasn't able to get static files to load so I adjusted my routes
app.use('/views', express.static(path.join(__dirname, '../views')));
app.use('/assets', express.static(path.join(__dirname, '../assets')));

// Load secret page
app.get('/secret', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/secret.html'));
});

// Instead of using a controller I adjusted the routes for post, get, and delete
app.post('/secret/postTask', (req, res) => {
  const { item } = req.body;
  Task.create({ item }, (err, doc) => {
    if (err) console.log('err in post /secret -> ', err);
    res.status(200).json(doc);
  });
});

app.get('/secret/getTask', (req, res) => {
  Task.find({}, (err, doc) => {
    if (err) console.log('err in post /secret -> ', err);
    res.status(200).json(doc);
  });
});

app.delete('/secret/deleteTask', (req, res) => {
  const { id } = req.body;
  Task.deleteOne({ id }, (err, doc) => {
    if (err) console.log('err in post /secret -> ', err);
    res.status(200).json(doc);
  });
});


// Load homepage
app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

// To catch incorrect routes
app.get('*', (req, res) => {
  console.log('route does not exist');
});

// Global Error Handler
app.use('/*', (err, req, res, next) => {
  console.log(err);
  res.status(500).send('Something broke!');
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
