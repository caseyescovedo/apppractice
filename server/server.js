const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const PORT = 3333;

// Import task controller
const taskController = require('./controllers/taskController');

// Import auth controller
const authController = require('./controllers/authController');

// Parse request body
app.use(express.json());

// Needed to grab request body from form submission
app.use(express.urlencoded({ extended: true }));

// To parse cookies
app.use(cookieParser());

// Serve static files in assets
app.use(express.static('assets'));

// Serve secret.html on secret route but check cookie first
app.use('/secret', authController.checkCookie, (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/secret.html'))
});

// Serve secret page upon signin
app.post('/signin', authController.authUser, (req, res) => {
  res.status(200);
  res.sendFile(path.resolve(__dirname, '../views/secret.html'));
});

// Routes to post, get, and delete tasks
// Adds new item
app.post('/tasks', taskController.postTask, (req, res) => {
  res.status(200);
  res.json(res.locals.posted);
});
// Gets all items
app.get('/tasks', taskController.getTasks, (req, res) => {
  res.status(200);
  res.json(res.locals.items);
})
// Deletes item
app.delete('/tasks', taskController.deleteTask, (req, res) => {
  res.status(200);
  res.json(res.locals.deleted);
})

// Serve index.html on slash route
app.use('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/index.html'))
});

// Error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express caught unknown middleware error',
    status: 500,
    message: {err: 'An error occurred: ' + err}
  }
  // Change defaultErr based on error message that comes back
  const errResponse = Object.assign({}, defaultErr, err);
  console.log(errResponse.log);
  res.status(errResponse.status);
  res.json(errResponse.message);
  return;
});

app.listen(PORT, () => {
  console.log('Server listening on port:', PORT)
});