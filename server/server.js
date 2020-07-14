const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

// const authController = require('./controllers/authController');
const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');

const taskRouter = express.Router();
taskRouter.get('/', authController.isLoggedIn, taskController.getTasks,
  (req, res) => res.status(200).json(res.locals.tasks));
taskRouter.post('/', authController.isLoggedIn, taskController.postTask, taskController.getTasks,
  (req, res) => res.status(200).json(res.locals.tasks));

taskRouter.delete('/:id', authController.isLoggedIn, taskController.deleteTask, taskController.getTasks,
  (req, res) => res.status(200).json(res.locals.tasks));

const PORT = 3333;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, './../assets')));

app.use('/task', taskRouter);

// root of application is requested
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

app.post(
  '/signin',
  authController.verifyCredentials,
  authController.setLoginCookie,
  (req, res) => {
    // what should happen here on successful sign up?
    res.redirect('/secret');
  }
);

app.get('/secret',
  authController.isLoggedIn,
  (req, res) => {
    res.sendFile(path.join(__dirname, '../views/secret.html'));
});


// in case any other resource is requests, return not found 404
app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send('Internal Server Error');
});
  
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

module.exports = app;