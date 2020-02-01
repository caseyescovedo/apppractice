const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');

const app = express();

const PORT = 3333;

// Handle routes

// In Express, content-type header is automatically updated depending on file type
// text/html, text/css, application/javascript, ...

// Serve static file requests from /assets
app.use(express.static('assets'));
// Convert request bodies into JSON objects
app.use(express.json());
// Parse incoming HTML form request bodies
app.use(bodyParser.urlencoded({ extended: true }));
// Parse cookies from all incoming requests
app.use(cookieParser());

// App entry page for user to login
app.get('/', (req, res) => {
  const html = path.resolve(__dirname, '../views/index.html');
  res.sendFile(html);
});

// Signin route handler, Authenticate credentials, set cookie, and redirect to secret page
app.post('/signin',
  authController.authenticateUser,
  authController.setCookie,
  (req, res) => {
    console.log(req.body);
    res.redirect('/secret');
  });

// App secret page served upon user authentication
app.get('/secret',
  authController.checkCookie,
  (req, res) => {
    const secret = path.resolve(__dirname, '../views/secret.html');
    res.sendFile(secret);
  });

// Serve up all tasks stored in database
app.get('/getTasks',
  taskController.getTasks,
  (err, res) => {
    res.send(res.locals.allTasks);
  });

// Post task route handler
app.post('/postTask',
  taskController.postTask,
  (req, res) => {
    res.status(200).send({ msg: 'Successfully posted a task' });
  });

// Delete task route handler
app.delete('/deleteTask',
  taskController.deleteTask,
  (req, res) => {
    res.send({ msg: 'Successfully deleted a task' });
  });

// Simple global error handler that shortcircuits any responses
app.use((err, req, res) => {
  if (err) console.log('Global error handler invoked: ', err);
  res.status(400).send({ msg: `Error processing your request:\n${err}` });
});

// App listening
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
