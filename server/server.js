const express = require('express');

const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3333;

const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');

app.use(express.static('assets'));
app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

// static files routes
app.get('/', (req, res) => {
  return res.sendFile(path.resolve(__dirname, '../views/index.html'));
});

app.get('/secret', (req, res) => {
  // if cookie doesn't exist you wont be able to view secret page
  if (!req.cookies['token']) return res.send('You must be signed in to view this page');
  return res.sendFile(path.resolve(__dirname, '../views/secret.html'));
});

// server endpoints
app.get('/task', taskController.getTasks, (req, res) => {
  return res.status(200).json(res.locals.getTasks);
});

app.post('/task', taskController.postTask, taskController.getTasks, (req, res) => {
  return res.status(200).json(res.locals.getTasks);
});

app.delete('/task', taskController.deleteTask, (req, res) => {
  return res.sendStatus(200);
});

app.post('/signin', authController.login, (req, res) => {
  // setting a cookie on successful login
  res.cookie('token', 'admin', { maxAge: 10000 });
  return res.redirect('/secret');
});

// error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Check message for express middleware error',
    status: 400,
    message: { err: 'Error in express middleware' }
  }
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj);
  return res.status(errorObj.status).json(errorObj.message);
});

// port listener
app.listen(PORT, () => {
  console.log('Server listening on port ', PORT);
});