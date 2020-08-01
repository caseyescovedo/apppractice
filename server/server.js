const express = require('express');
const app = express();
const path = require('path');
const PORT = 3333;
const taskController = require('./controllers/taskController.js');

// const mongoose = require('mongoose');
//const { urlencoded } = require('express');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/css/style.css', (req, res) => {
  return res.sendFile(path.join(__dirname, '../assets/css/style.css'));
});
app.get('/js/index.js', (req, res) => {
  return res.sendFile(path.join(__dirname, '../assets/js/index.js'));
});

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../views/index.html'));
});

app.get('/secret', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../views/secret.html'));
});

app.get('/tasks', taskController.getTasks, (req, res) => {
  res.status(200).json(res.locals.tasks);
});

app.post('/add', taskController.postTasks, (req, res) => {
  res.status(200).json(res.locals.task);
});

app.use('/*', (req, res) => {
  console.log('404 Error');
  res.sendStatus(404);
});

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
