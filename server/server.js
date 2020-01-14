const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const TasksController = require('./controllers/taskController');
const authController = require('./controllers/authController');


const PORT = 3333;

app.listen(3333, () => {
  console.log('App listening on port: ', PORT);
});

// Body parser
app.use(bodyParser());

// Serve the CSS static file to the server
// res.setHeader('content-type', 'text/html')

app.use('/', express.static(path.join(__dirname, '../assets')));
app.use('/assets', express.static(path.join(__dirname, '../assets')));

// Serve up the index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
})

// Serve up the login
app.get('/secret', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/secret.html'));
})

// Add a task to the list
app.post('/secret', TasksController.postTask, (req, res) => {
  res.status(200).json(res.locals.task)
})

// Get all items in the list
app.get('/secretTask', TasksController.getTasks, (req, res) => {
  res.status(200).json(res.locals.getTasks);
})

// Delete an item in the list
app.delete('/secret/:id', TasksController.deleteTask, (req, res) => {
  res.status(200).json(res.locals.task);
})

// --------------------------------------------------------------------------login

app.post('/signin', authController.verifyUser, (req, res) => {
  console.log('inside the signin route')
  res.status(200)
})

// app.get('/cookie', (req, res) => {
//   res.cookie({ key: 'token', value: 'admin' }).send('Cookie is set');   // stopped here at cookies, not enough time
// });

// Client side error
app.use('*', (req, res) => {
  res.sendStatus(404);
})


// Server side global error
app.use((err, req, res, next) => {
  console.log('server side error: ', err);
  res.sendStatus(418);
})


