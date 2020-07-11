const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const colors = require('colors');

const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');

const app = express();

const PORT = 3333;

// Body parser
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
app.use(morgan('dev'));

app.use(express.static(path.resolve(__dirname, '../assets')));

app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../views/index.html'));
});

app.get('/secret', (req, res) => {
  if (req.cookies.token === 'admin') res.status(200).sendFile(path.resolve(__dirname, '../views/secret.html'));
  else res.status(401).send('You must be signed in to view this page');
});

app.post('/signin', authController.authenticateUser, (req, res) => {
  if (res.locals.authenticated) res.redirect('/secret');
  else res.status(401).send('unsuccessful login attempt');
});

app.post('/api/secret', taskController.postTask, (req, res) => {
  res.status(200).json({ success: true, task: res.locals.task });
});

app.get('/api/secret', taskController.getTasks, (req, res) => {
  res.status(200).json({ success: true, tasks: res.locals.tasks });
});

app.delete('/api/secret', taskController.deleteTask, (req, res) => {
  res.status(200).json({ success: true, message: 'Task has been deleted' });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`.yellow.bold));
