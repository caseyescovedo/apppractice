const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const taskController = require('./controllers/taskController.js');
const authController = require('./controllers/authController.js');

// handle incoming cookies
app.use(cookieParser());

// handle incoming JSON
app.use(express.json());

// parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// handle static files
app.use(express.static('assets'));

// handle sign-in
app.post('/signin', authController.verifyUser, (req, res) => {
  res.redirect('/secret');
});

// serve home page
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/index.html'));
});

// server secret page
app.get('/secret', authController.checkCookie, (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/secret.html'));
});

// route to get tasks
app.get('/get-tasks', taskController.getTasks, (req, res) => {});

// route to post task
app.post('/post-task', taskController.postTask, (req, res) => {
  res.send(res.locals.newDoc);
});

// route to delete task
app.delete('/delete-task', taskController.deleteTask, (req, res) => {});

app.listen(3333, () => {
  console.log('Now listening on Port 3333');
});
