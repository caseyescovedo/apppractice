const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const taskController = require('./controllers/taskController.js')
const authController = require('./controllers/authController.js')

// Creating instance of express

const app = express();

// Parsing incoming bodies
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

// Serving up index.html

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/index.html'));
})

// Serving up secret.html

app.get('/secret',
authController.checkCookie,
(req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/secret.html'));
})

// Serving up CSS style sheets

app.get('/css/style.css', (req, res) => {
  res.set('Content-Type', 'text/css')
  res.sendFile(path.resolve(__dirname, '../assets/css/style.css'));
})


// Serving up JS files

app.get('/js/index.js', (req, res) => {
  res.set('Content-Type', 'text/js')
  res.sendFile(path.resolve(__dirname, '../assets/js/index.js'));
})


// Handling HTTP requests

app.post('/signin',
  authController.checkCreds,
  authController.cookie,
  (req, res) => {
    res.redirect('/secret');
  })

app.post('/create',
  taskController.postTask,
  (req, res) => {
    res.status(200).json('Task successfully posted');
  })

app.get('/retrieve',
  taskController.getTasks,
  (req, res) => {
    res.status(200).json(res.locals.tasks);
  })

app.delete('/delete',
  taskController.deleteTask,
  (req, res) => {
    res.status(200).json('Task successfully deleted');
  })


// Global error handler

app.use((err, req, res, next) => {
  res.status(400).json(err);
})


// Starting the server

app.listen(3333, function() {
  console.log('Listening on port 3333...');
});
