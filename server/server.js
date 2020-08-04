const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();

const authController = require('./controllers/authController');
const taskController = require('./controllers/taskController');

const PORT = 3333;

// process req body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// add cookie methods for req and res
app.use(cookieParser());

// serve static files from /assets
app.use(express.static(path.join(__dirname, '../assets')));

// serve index.html on initial request
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../views/index.html'));
});

// get all tasks from db
app.get('/tasks', taskController.getTasks, (req, res) => {
  if (!res.locals.data) res.status(414).send('could not fetch tasks');
  res.status(200).json(res.locals.data);
});

// add one task to the db
app.post('/tasks', taskController.postTask, (req, res) => {
  if (!res.locals.data) res.status(418).send('could not add task');
  res.status(200).json(res.locals.data);
});

// delete one task to the db
app.delete('/tasks/:id', taskController.deleteTask, (req, res) => {
  if (!res.locals.data) res.status(418).send('could not remove task');
  res.status(200).json(res.locals.data);
});


// serve secret page on successful login
app.post('/signin', authController.verifyUser, authController.setCookie, (req, res) => {
  if (!res.locals.data) res.status(401).send('unsuccessful login attempt');
  res.status(200).sendFile(path.join(__dirname, '../views/secret.html'));
});

app.get('/secret', authController.checkCookie, (req, res) => {
  if (!res.locals.cookie) res.status(401).send('You must be signed in to view this page');
  res.status(200).sendFile(path.join(__dirname, '../views/secret.html'));
});


// handle unknown routes
app.use('*', (req, res) => {
  res.status(404).send('404 not found :(');
})


// global error handler
app.use((err, req, res, next) => {
  const defaultError = {
    location: 'unknown location',
    log: 'there seems to be an error somewhere...',
  }
  console.log(`
    Global Error handler: 
    Error in ${err.location ? err.location : defaultError.location} 
    log: ${err.log ? err.log : defaultError.log}`
    );
});

// always listening
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`);
});