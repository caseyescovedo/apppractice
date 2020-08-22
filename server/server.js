const express = require('express');
const app = express();
const PORT = 3333;
const path = require('path');
const cookieParser = require('cookie-parser');
const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('views'), express.static('assets'));

app.post('/signin', authController.checkCredentials, (req, res) => {
  res.redirect('secret');
});

app.use(
  '/secret',
  authController.checkIfSignedIn,
  express.static(path.join(__dirname, '../views/secret.html'))
);

app.post('/postTask', taskController.postTask, (req, res) => {
  res.json(res.locals.newTask);
});

app.get('/getTasks', taskController.getTasks, (req, res) => {
  res.json(res.locals.tasks);
});

app.delete('/deleteTask/:id', taskController.deleteTask, (req, res) => {
  res.json(res.locals.deletedItem);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
