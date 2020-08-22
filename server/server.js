const express = require('express');
const app = express();
const path = require('path');

const taskController = require('./controllers/taskController.js');
const authController = require('./controllers/authController.js');

const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

app.use(express.json());

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('assets'));

app.use('/secret', authController.checkUser, (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../views/secret.html'));
});

app.post('/signIn', authController.validateUser, (req, res) => {
  res.redirect('/secret');
});

app.get('/get', taskController.getTasks, (req, res) => {
  res.status(200).json(res.locals.tasks);
});

app.post('/add', taskController.postTask, (req, res) => {
  res.status(200).send();
});

app.get('/validate', authController.validateUser, (req, res) => {
  res.status(200).send();
});

app.delete('/delete', taskController.deleteTask, (req, res) => {
  res.status(200).send();
});

//was just playing around with an update feature :) you can uncomment out to see how it works!
// app.patch('/update', taskController.updatetask, (req, res) => {
//   res.status(200).send();
// });

app.use('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../views/index.html'));
});

app.listen(3333);
