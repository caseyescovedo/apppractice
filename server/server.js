const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');

const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');

app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());

app.post('/signin', authController.login);

app.get('/getTasks', taskController.getTasks);

app.post('/postTask', taskController.postTask);

app.delete('/deleteTask', taskController.deleteTask);

app.get('/secret', authController.authCheck, (req, res) => {
  res.sendFile(path.resolve(__dirname, '../', 'views', 'secret.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../', 'views', 'index.html'));
});

app.use(express.static(path.resolve(__dirname, '../', 'assets')));

app.use((err, req, res, next) => {
  res.status(500).send('We are sorry, please try again later!');
});

app.listen(3333);
