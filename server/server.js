const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');

const app = express();
const PORT = 3333;

app.use(express.static('assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.sendFile(
    path.join(__dirname, '../views/index.html'),
    {
      headers: { 'Content-Type': 'text/html; charset=UTF-8' },
    },
    (err) => {
      if (err) console.log(err);
    }
  );
});

app.get('/secret', authController.isLoggedIn, (req, res) => {
  res.sendFile(
    path.join(__dirname, '../views/secret.html'),
    {
      headers: { 'Content-Type': 'text/html; charset=UTF-8' },
    },
    (err) => {
      if (err) console.log(err);
    }
  );
});

app.post('/signin', authController.validateCredentials, (req, res) => {
  res.redirect('/secret');
});

app.post('/tasks/', taskController.postTask, (req, res) => {
  res.status(200).json('Task Added!');
});

app.get('/tasks/', taskController.getTasks, (req, res) => {
  res.status(200).json(res.locals.data);
});

app.delete('/tasks/:id', taskController.deleteTask, (req, res) => {
  res.status(200).send(`Task deleted!`);
});

//catch all route
app.use('*', (req, res) => {
  res.status(404).send('File Not Found');
});

//global error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Internal Server Error');
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
