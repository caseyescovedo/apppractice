const path = require('path');
const express = require('express');
const app = express();
const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');

// body parser for JSON format, and URL format
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
// cookie parser for web cookies
app.use(require('cookie-parser')());

//---> server static files <---
app.use(express.static(path.resolve(__dirname, '../views'))); // this will server index.html as default when GET request on 'http://{host}:{port}/'
app.use('/secret', authController.protect, express.static(path.resolve(__dirname, '../views/secret.html')));
app.use(express.static(path.resolve(__dirname, '../assets'))); // this will server assets folder as default when GET request on 'http://{host}:{port}/css or /js'

//---> Tasks api <---
app.get('/api/tasks', taskController.getTasks, (req, res) => {
  return res.status(200).json(res.locals.data);
});
app.post('/api/task', taskController.postTask, (req, res) => {
  return res.status(200).json(res.locals.data);
});
app.delete('/api/task', taskController.deleteTask, (req, res) => {
  return res.sendStatus(200);
});

//---> auth api <---
app.post('/api/signIn', authController.signIn, (req, res) => {
  return res.redirect('/secret');
});

// Global error handler
app.use((err, req, res, next) => {
  const error = Object.assign({
    statusCode: 404,
    message: 'Error while xhr'
  }, err);

  res.status(error.statusCode).send(error.message);
});

const pool = require('./models/TaskModel');

pool.connect((err, client, release) => { // connect to database first before starting server
  if (err) throw err;
  console.log('postgres database open on port 5432 (as default port)');
  app.listen(3333, () => {
    console.log('server open and listening on port 3333');
  });
});
