const express = require('express');

const app = express();
const path = require('path');
const authController = require('./controllers/authController');
const taskController = require('./controllers/taskController');

const cookieParser = require('cookie-parser');

const PORT = 3333;

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.post(
  '/signin',
  authController.signin,
  authController.setCookie,
  (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../views/secret.html'));
  }
);

app.get('/secret', authController.checkCookie, (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../views/secret.html'));
});

app.get('/getTasks/:username', taskController.getTasks, (req, res) => {
  res.status(200).json(res.locals.allTasks);
});

app.post('/postTask', taskController.postTask, (req, res) => {
  res.status(200).json(res.locals.newTodoId);
});

app.delete(
  '/deleteTask/:username/:itemId',
  taskController.deleteTask,
  (req, res) => {
    res.status(200).json(res.locals.newTodo);
  }
);

app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../views/index.html'));
});

app.use(express.static(path.resolve(__dirname, '../assets')));

app.listen(PORT, () => {
  console.log('server started on 3333');
});
