const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');

const app = express();
const PORT = process.env.PORT || 3333;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../assets')));

app.post('/signin', authController.authenticateUser, (req, res) => {
  if (res.locals.authenticated) res.redirect('/secret');
  else res.send('unsuccessful login attempt');
});

app.get('/secret', authController.checkCookie, (req, res) => {
  if (res.locals.session) res.sendFile(path.join(__dirname, '../views/secret.html'));
  else res.redirect('/');
});

app.post('/posttask', taskController.postTask, (req, res) => {
  if (res.locals.taskId === undefined) {
    res.status(500).send({ taskCreated: false });
  }
  res.status(200).send({ taskCreated: true, taskId: res.locals.taskId });
});

app.get('/gettasks', taskController.getTasks, (req, res) => {
  res.send({ tasks: res.locals.tasks });
});

app.delete('/deletetask', taskController.deleteTask, (req, res) => {
  if (res.locals.deletedId === undefined) res.status(500).send({ taskDeleted: false });
  else res.status(200).send({ taskDeleted: true, deletedId: res.locals.deletedId });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

app.get('*', (req, res) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  console.log(err);
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, err);
  res.json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
