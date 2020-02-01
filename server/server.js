const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const cookieParser = require('cookie-parser')

const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');

const PORT = 3333;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cookieParser());

app.use('/assets', express.static(path.join(__dirname, '../assets')));

// app.use('/tasks', tasks);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

app.get('/secret', authController.checkCookie, (req, res) => {
  res.sendFile(path.join(__dirname, '../views/secret.html'));
});

// Saw no need to create another route folder for such a simple app.
app.get('/tasks/getTasks', taskController.getTask, (req, res) => {
  res.status(200).json(res.locals.tasks);
});

app.post('/tasks/postTask', taskController.postTask, taskController.getTask, (req, res) => {
  res.status(200).json(res.locals.tasks);
});

app.post('/signin', authController.authenticate, (req, res) => {
  res.status(200).redirect('/secret');
});

app.delete('/tasks/deleteTask', taskController.deleteTask, taskController.getTask, (req, res) => {
  res.status(200).json(res.locals.tasks);
});

app.use((err, req, res, next) => {  // not quite the robust middleware error handler you taught us
  console.error(err.stack);         // but does the job today
  res.status(500).send('Something broke!');
})

app.listen(PORT, () => console.log(`To-Do list app listening to port ${PORT}`));
