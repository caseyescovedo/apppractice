const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3333;
const authController = require('./controllers/authController');
const taskController = require('./controllers/taskController');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, '../assets')));

app.get('/tasks', taskController.getTasks);
app.post('/tasks', taskController.postTask);
app.delete('/tasks', taskController.deleteTask);

app.post('/signin', authController.verifyUser, authController.setCookie, (req, res) => {
  res.redirect('/secret');
});

app.get('/secret', authController.verifyCookie, (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/secret.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
