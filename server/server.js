const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const taskController = require('./controllers/taskController');

// creater server
const app = express();
const PORT = 3333;

// set up parsers
app.use(bodyParser.json());
app.use(cookieParser());

// serve static files
app.use(express.static(path.join(__dirname, '../assets')));

// routes
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../views/index.html'));
});

app.get('/secret',  (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../views/secret.html'));
});

app.get('/tasks', taskController.getTasks, (req, res) => {
  res.status(200).send('get route works');
});

app.post('/tasks', taskController.postTask, (req, res) => {
  res.status(200).send('post route works');
});

app.delete('/tasks', taskController.deleteTask, (req, res) => {
  res.status(200).send('delete route works');
});

// catch-all for unknown routes
app.use('*', (req, res) => {
  res.status(404).send('page not found :(');
});

// global error handler
app.use((err, req, res, next) => {
  res.status(500).send('error message', err);
});

// start server
app.listen(PORT, () => {
  console.log('Hello you are awesome! Also this very cool server is listening on port', PORT);
});