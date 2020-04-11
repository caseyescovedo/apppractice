// import libraries
require('dotenv').config();
const express = require('express');
const path = require('path');

const cookieParser = require('cookie-parser');

const { createTask, getTasks, deleteTask } = require('./controllers/taskController.js');
const { verifyUser, setCookie, verifyCookie } = require('./controllers/authController');

// server config stuff
const app = express();
const PORT = process.env.port || 3333;

// parse body and cookies
app.use(express.json());
// apparently this uses body-parser under the hood based on console message????
app.use(express.urlencoded());
app.use(cookieParser());

// serve static css/JS assets
app.use(express.static(path.join(__dirname, '../assets')));

// serves the home page
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../views/index.html'));
});

// validate signin
app.post('/signin', verifyUser, setCookie, (req, res) => {
  res.redirect('/secret');
});

// serves the secret page
app.get('/secret', verifyCookie, (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../views/secret.html'));
});

// used to retrieve tasks
app.get('/secret/tasks', getTasks, (req, res) => {
  res.status(200).json(res.locals.tasks);
});

// used to create tasks
app.post('/secret/tasks', createTask, (req, res) => {
  res.sendStatus(201);
});

// used to delete tasks
app.delete('/secret/tasks/:id', deleteTask, (req, res) => {
  res.json('message successfully deleted');
});

// 404 handler
app.get('*', (req, res) => res.sendStatus(404));

// start server
app.listen(PORT, () => console.log(`listening on ${PORT}`));
