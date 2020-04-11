const express = require('express');
const app = express();
const path = require('path');

const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');

const PORT = 3333;

app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, '../assets')));

// Serve index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
})

app.get('/secret', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/secret.html'));
})

app.post('/signin', authController.verify, (req, res) => {
  res.redirect('/secret');
})

app.get('/getTasks', taskController.getTasks, (req, res) => {
  res.send(res.locals.getTasks);
})

app.post('/postTask', taskController.postTask, (req, res) => {
  res.status(200).json(res.locals.item);
})

app.delete('/delete/:id', taskController.deleteTask, (req, res) => {
  res.status(200).send(res.locals.deleted);
})

// Catch all error handler
app.use('*', (req, res) => {
  console.log('Request Not Found');
  res.status(404);
})


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})