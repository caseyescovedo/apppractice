// required items
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const taskController = require('./controllers/taskController.js');
const authController = require('./controllers/authController.js');

const app = express();

// DO NOT CHANGE
const PORT = 3333;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(session({secret: 'shhh' }));

// serve static files COME BACK TO SET HEADERS
app.use('/', express.static(path.resolve(__dirname, './../assets')));

// serve the index.html
app.get('/', (req, res) => {
  if (req.session.cookie.secret) {
    res.status(200).sendFile(path.resolve(__dirname, './../views/secret.html'));
  } else {
    req.session.secret = 'cookie';
    res.status(200).sendFile(path.resolve(__dirname, './../views/index.html'));
  }
});

// serve the secret html
app.get('/secret', authController.validateUser, (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, './../views/secret.html'));
});

// get all tasks route
app.get('/tasks', taskController.getTasks, (req, res) => {
  res.status(200).json(res.locals).end();
});

// post a new task
app.post('/tasks', taskController.postTask, (req, res) => {
  res.status(200).end();
});

// delete a task
app.delete('/tasks/:id', taskController.deleteTask, (req, res) => {
  res.status(200).json(res.locals).end();
});

app.post('/signin', (req, res) => {
  const loginInfo = req.body;
  if (loginInfo.username === 'codesmith'
  && loginInfo.password === 'ilovetesting') {
    res.redirect('/secret');
    return;
  } else {
    res.send('incorrect login or password');
  }
});

// catch all error handler
app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

// global error handler
app.use((err, req, res, next) => {
  console.log('Error in global', err);
  res.status(500).send('Internal Server Error');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
