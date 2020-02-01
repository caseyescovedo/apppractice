/* eslint-disable no-console */
const express = require('express');

const app = express();
const PORT = 3333;
const path = require('path');

const taskController = require('./controllers/taskController.js');
const authController = require('./controllers/authController.js');


app.use(express.json());

app.use(express.static('views'));
app.use(express.static('assets'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/index.html'));
});

app.get('/secret', authController.getUser, authController.createCookie, (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/secret.html'));
});

app.get('/secret/get', authController.findCookie, taskController.getTasks, (req, res) => {
  res.status(200).json(res.locals.tasks);
});

app.post('/secret/post', authController.findCookie, taskController.postTask, taskController.getTasks, (req, res) => {
  res.status(200).json(res.locals.tasks);
});

app.delete('/secret/delete', authController.findCookie, taskController.deleteTask, taskController.getTasks, (req, res) => {
  res.status(200).json(res.locals.tasks);
});

app.use((req, res) => res.sendStatus(404));

app.use((err, req, res, next) => {
  console.log(err);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
