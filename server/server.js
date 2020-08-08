const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../views/index.html'));
});

app.post('/signin', authController.verfiyCredentials, (req, res) => {
  res.redirect('/secret');
});

app.get('/secret', authController.verifyCookies, (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../views/secret.html'));
});

app.get('/css/style.css', (req, res) => {
  res.setHeader('Content-Type', 'text/css');
  res.status(200).sendFile(path.resolve(__dirname, '../assets/css/style.css'));
});

app.get('/js/index.js', (req, res) => {
  res.setHeader('Content-Type', 'text/javascript');
  res.status(200).sendFile(path.resolve(__dirname, '../assets/js/index.js'));
});

app.post('/postTask', taskController.postTask, (req, res) => {
  res.status(200).json(res.locals.task);
});

app.get('/getTasks', taskController.getTasks, (req, res) => {
  res.status(200).json(res.locals.allTasks);
});

app.delete('/deleteTask/:id', taskController.deleteTask, (req, res) => {
  res.status(200).json(res.locals.deletedTask);
});

app.listen('3333', () => console.log('server listening on port 3333'));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, err);
  // console.log(errorObj.log);
  res.status(errorObj.status).json(errorObj.message);
});
