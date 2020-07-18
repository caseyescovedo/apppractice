const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();

const PORT = 3333;

//connect controllers
const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');

// set up parsers
app.use(express.json());
app.use(cookieParser());

// serve static files
app.use('/assets', express.static(path.resolve(__dirname, '../assets')));

// serve index.html
app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../views/index.html'));
});

// serve secret.html
app.get('/secret', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../views/secret.html'));
});

// routes
// get tasks
app.get('/tasks', taskController.getTasks, (req, res) => {
  return res.status(200).json(res.locals.tasks);
});

// post task
app.post('/tasks', taskController.postTask, (req, res) => {
  return res.status(200).json(res.locals.tasks);
});

//delete task
app.delete('/tasks/:id', taskController.deleteTask, (req, res) => {
  return res.status(200).json(res.locals.tasks);
});

// on post request from signin, verify user.....
app.post('/signin', authController.verifyUser, (req, res) => {
  return res.status(200).json('You must be signed in to view the page');
});

// error handlers
app.use('*', (req, res) => {
  return res.status(404).json('Routing error.');
});

app.use((err, res, req, next) => {
  res.status(500).send((err) => {
    console.log({
      log: 'Error in middleware',
      message: `Error: ${err}`,
    });
  });
});

// connect to port
app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});
