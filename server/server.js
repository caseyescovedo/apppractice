/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const flowTest = require('./utils/flowTest');
const taskController = require('./controllers/taskController');

const PORT = 3333;

const app = express();

app.use(
  // make cookies readable by expres
  cookieParser(),
  // make body readable by express
  express.json(),
  // debugging assistant
  flowTest,
  // serve files from assets folder
  express.static(path.resolve(__dirname, '../assets')),
  // (req, res, next) => console.log(res.headers),
);

// hello world route
// app.use((req, res, next) => res.send('hi :)'));

// serve index.html as home page
app.get('/',
  (req, res) => res.sendFile(path.resolve(__dirname, '../views/index.html')));


// serve secret.html
app.get('/secret',
  (req, res) => res.sendFile(path.resolve(__dirname, '../views/secret.html')));

app.get('/tasks',
  taskController.getTasks,
  (req, res) => {
    // console.log(res.locals.tasks);
    res.status(200).json({ tasks: res.locals.tasks });
  });

app.post('/tasks',
  taskController.postTask,
  taskController.getTasks,
  (req, res) => res.status(200).json(res.locals.tasks));

app.delete('/tasks',
  taskController.deleteTask,
  taskController.getTasks,
  (req, res) => res.status(200).json(res.locals.tasks));

// global error handler
app.use((err, req, res) => {
  // message to server
  console.log('Error :( \n');
  console.log(err.serverErr);
  res.status(500);
  // message to client
  return res.render('Error: ', err.clientErr);
});


app.listen(PORT, () => console.log('listening on PORT: ', PORT));
