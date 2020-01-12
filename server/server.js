const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const TaskController = require('./controllers/taskController.js');
const AuthController = require('./controllers/authController.js');

const PORT = 3333;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../assets/')));

// gets tasks when request is made to get tasks
app.get('/secret/tasks', TaskController.getTasks, (req, res) => {
  res.status(200).json(res.locals.tasks);
});

// serves up secret html
app.get('/secret', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../views/secret.html'));
});

// posts new task and returns all current tasks
app.post('/secret', TaskController.postTask, (req, res) => {
  res.status(200).json(res.locals.tasks);
});

// deletes new task and returns all current tasks
app.delete('/secret', TaskController.deleteTask, TaskController.getTasks, (req, res) => {
  res.status(200).json(res.locals.tasks);
});

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../views/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

app.use((req, res) => res.sendStatus(404));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' }
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

module.exports = app;
