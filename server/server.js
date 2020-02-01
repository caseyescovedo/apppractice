const express = require('express');
const path = require('path');
const app = express();

const taskController = require('./controllers/taskController');

// Testing PG pool
// const pool = require('./models/TaskModel');

//taskController.postTask | taskController.getTasks | taskController.deleteTask

app.get('/getTasks', taskController.getTasks, (req, res) => {
  console.log('error in getTasks');
});

app.get('/secret', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../', 'views', 'secret.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../', 'views', 'index.html'));
});

app.use(express.static(path.resolve(__dirname, '../', 'assets')));

app.listen(3333);
