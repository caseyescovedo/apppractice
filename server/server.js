const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');

const app = express();

const PORT = 3333;

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, '../assets')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/index.html'));
});

app.post(
  '/signin',
  authController.verifyLogin,
  authController.setCookie,
  (req, res) => {
    res.redirect('/secret');
  }
);

app.get('/task', taskController.getTasks, (req, res) => {
  console.log('finished taskController.getTask');
});
app.post('/task', taskController.postTask, (req, res) => {
  console.log('finished taskController.postTask');
});
app.delete('/task', taskController.deleteTask, (req, res) => {
  console.log('finished taskController.deleteTask');
});

app.get('/secret', authController.verifyCookie, (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/secret.html'));
});

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
});
