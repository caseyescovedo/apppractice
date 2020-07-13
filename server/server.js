// const fs = require('fs');
const path = require('path');
const express = require('express');

const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');

const app = express();

// mongoose.connect(URI);
// mongoose.connection.once('open', () => {
//   console.log('Connected to Database');
// });

app.use(express.static(path.join(__dirname, '../assets')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

app.get('/secret', 
  // authController.check, 
  authController.setCookie, 
  (req, res) => {
  if (!res.cookie) return res.status(400).send('You must be signed in to view this page');
  res.sendFile(path.join(__dirname, '../views/secret.html'));
});

app.get('/getTasks', taskController.getTasks, (req, res) => {
  res.status(200).json(res);
});

app.post('/addTask', taskController.postTask, (req, res) => {
  res.status(200).json(res);
});

app.delete('/deleteTask', taskController.deleteTask, (req, res) => {
  res.status(200).json(res);
});

app.listen(3333, () => console.log('Listening on port 3333...'));

module.exports = app;
