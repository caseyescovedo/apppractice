const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');

const PORT = 3333;

//parse all requests
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

//serve up all static files that are within the assets folder
app.use(express.static('assets'));

//serve up the login html when navigating to localhost:3000 root
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../views/index.html'));
});

//serve up the authenticated html when navigating to localhost:3000/secret
app.get('/secret', authController.checkCookie, (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../views/secret.html'));
});

//api routes
//route to get an index of all tasks
app.post('/api/login', authController.authenticate, authController.setCookie, (req, res) => {
  if(res.locals.success) res.status(200).redirect('http://localhost:3333/secret');
  else res.status(401).json('You must be signed in to view this page');
});

app.get('/api', taskController.getTasks, (req, res) => {
  if(res.locals.success) res.status(200).json(res.locals.tasks);
  else res.sendStatus(500);
});

//route to post a new task
app.post('/api', taskController.postTask, (req, res) => {
  if(res.locals.success) res.status(200).json(res.locals.id);
  else res.sendStatus(500);
});

//route to delete a task with an id parameter
app.delete('/api/:id', taskController.deleteTask, (req, res) => {
  if(res.locals.success) res.status(200).json('success');
  else res.sendStatus(500);
});

//catches all bad routes put in by the user, and sends a 400 status
app.use('*', (req, res) => {
  res.status(400).json('This page does not exist')
});

//global error handler that is called when middleware passes an arg to next
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'error handler caught unknown middleware error',
    status: 500,
    message: { err: 'an error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

//specifies which port server is listening on
app.listen(PORT, console.log(`listening on port ${PORT}`));
