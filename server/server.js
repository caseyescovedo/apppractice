const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3333;

const taskController = require('./controllers/taskController.js');
const authController = require('./controllers/authController.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/tasks', taskController.getTasks, (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  return res.status(200).json(res.locals.tasks);
});

app.post('/tasks', taskController.postTask, (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  return res.status(200).json(res.locals.newTask);
});

app.delete('/tasks/:_id', taskController.deleteTask, (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  return res.status(200).json('Item successfully deleted');
});

app.get('/secret', authController.checkCookie, (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  return res.status(200).sendFile(path.join(__dirname, '../views/secret.html'));
});

app.post('/signin', authController.login, authController.setCookie, (req, res) => {
  return res.redirect('/secret');
});

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  return res.status(200).sendFile(path.join(__dirname, '../views/index.html'));
});

app.use(express.static(path.join(__dirname, '../assets')));

app.use('*', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  return res.status(404).json('Error, page not found');
});

app.use((err, req, res, next) => {
  console.log(err);
  res.setHeader('Content-Type', 'application/json');
  return res.status(500).json(err || 'Internal server error');
});

app.listen(PORT, () => console.log('In the matrix on port ' + PORT));
