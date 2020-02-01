const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');

const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');

// Testing PG pool
// const pool = require('./models/TaskModel');

//taskController.postTask | taskController.getTasks | taskController.deleteTask

app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());

app.post('/signin', authController.login);

app.get('/getTasks', taskController.getTasks, (req, res) => {
  console.log('error in getTasks');
});

app.post('/postTask', taskController.postTask, (req, res) => {
  res.status(200).send();
});

app.delete('/deleteTask', taskController.deleteTask, (req, res) => {
  console.log('error in deleteTasks');
});

app.get('/secret', authController.authCheck, (req, res) => {
  res.sendFile(path.resolve(__dirname, '../', 'views', 'secret.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../', 'views', 'index.html'));
});

app.use(express.static(path.resolve(__dirname, '../', 'assets')));

app.listen(3333);
