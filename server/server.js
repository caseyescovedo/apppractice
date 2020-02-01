const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const Task = require('./models/TaskModel.js');

const TaskController = require('./controllers/taskController.js');
const app = express();
const PORT = 3333;

const db = mongoose.connect('mongodb+srv://nabramow:gradmongo!@cluster0-ufsoo.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true }, (err, database) => {
  if (err) return console.log(err);
  console.log('connected to mongoose!');
});

/* bodyParser allows Express to handle readng data from form elements
 * urlencoded method tells bodyParser to extract data from the <form> element
 * and add that data to the body property of the request object
 */

app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from assets folder
app.use('/assets/', express.static(path.resolve(__dirname, '../assets')));

// route handlers
app.get('/secret', (req, res) => {
  // check for cookie before rendering
  console.log('req.cookies ', req.cookies)
  res.status(200).sendFile(path.join(__dirname, '../views/secret.html'));
});

// route to taskController.postTask middleware in taskController file
app.post('/tasks/add', (req, res) => {
  console.log('made it to app.post!');
  console.log('post req.body.item ', req.body);
  // got a nested object need to get one level deeper
  Task.create({ item: req.body.item, created_at: req.body.created_at }, (err, results) => {
    console.log('results within Task.create ', results);
    if (err) console.log(err);
    res.redirect('/');
  });
});

// route to taskController.deleteTask middleware in taskController file
app.delete('/tasks/:id', (req, res) => {
  console.log('delete req.params ', req.params.id)
  Task.findByIdAndDelete(req.params.id, (err, results) => {
    if (err) console.log(err);
  });
});

// route to taskController.getTasks middleware to return tasks from db
app.get('/tasks', (req, res) => {
  console.log('made it to get in server.js!');
  Task.find((err, results) => {
    console.log('console logging results ', results);
    if (err) return console.log(err);
    res.send(results);
  });
});

// redirects user to signin page after submitting the login form
app.post('/signin', (req, res) => {
  console.log('req.boy signin form ', req.body);
  if (req.body.user === 'codesmith' && req.body.pass === 'ilovetesting') {
    res.cookie('token', 'admin');
    res.redirect('/secret');
  } else {
    // find way to display "incorrect login info" on screen
  }
})

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../views/index.html'));
});

// global error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!');
});

app.listen(3333, () => {
  console.log(`listening on ${  PORT}`);
});
