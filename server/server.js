const express = require('express');

const path = require('path');

const app = express();
const cookieParser = require('cookie-parser');

const PORT = 3000;
const taskController = require('./controllers/taskController.js');
const authController = require('./controllers/authController.js');

app.use(express.json());
app.use(cookieParser());

app.use(express.static('assets'));
app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../views/index.html'));
});


app.get('/login', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../views/secret.html'));
});

app.post('/signin', authController.checkUser, (req, res) => {
  res.redirect('/login');
});

app.get('/todo', taskController.getAllTasks, (req, res) => {
  res.status(200).json(res.locals.getAllTasks);
});

app.post('/todo', taskController.addTask, taskController.getAllTasks, (req, res) => {
  res.status(200).json(res.locals.getAllTasks);
});

app.delete('/todo', taskController.deleteTask, taskController.getAllTasks, (req, res) => {
  res.status(200).json(res.locals.getAllTasks);
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'express error handler caught unknown error, this is a global error',
    status: 400,
    message: { err: 'An error happened' },
  };
  const errObject = Object.assign(defaultErr, err);
  res.status(errObject.status).json(errObject.message);
});


app.use('*', (req, res) => res.sendStatus(404));

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
