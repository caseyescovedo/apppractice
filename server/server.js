const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');

const TaskController = require('./controllers/taskController.js');
const AuthController = require('./controllers/authController.js');

app.use(cookieParser());
app.use(express.json());
// req.body was always {}. Found the line below to handle that
app.use(express.urlencoded({ extended: false }));
app.use(express.static('assets'));

app.get('/', AuthController.checkCookies, (req, res) => {
  if (res.locals.goodCookie === true) {
    res.status(200).redirect('/secret');
  } else {
    res.status(200).sendFile(path.join(__dirname, '../views/index.html'));
  }
});

app.post('/signin', AuthController.verifySignin, (req, res) => {});

app.get('/secret', AuthController.checkCookies, (req, res) => {
  if (res.locals.goodCookie === true) {
    res.status(200).sendFile(path.join(__dirname, '../views/secret.html'));
  } else {
    res.send('You must be signed in to view this page');
  }
});

// API routes
app.get('/api/tasks', TaskController.getTasks, (req, res) => {
  res.status(200).json(res.locals.tasks);
});

app.post('/api/add', TaskController.postTask, (req, res) => {
  res.status(200).json(res.locals.task);
});

app.delete('/api/delete', TaskController.deleteTask, (req, res) => {
  res.status(200).json({ text: 'deleted' });
});

const PORT = '3333';
app.listen(PORT, () => {
  console.log('Server listening on port', PORT);
});
