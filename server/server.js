const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');

const app = express();
const PORT = 3333;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(`
  ***Flow test***
  METHOD: ${req.method}
  BODY: ${JSON.stringify(req.body)}
  `);
  next();
});

app.use(express.static('assets'));

app.get('/task', taskController.getTask, (req, res) => {
  // console.log(res.locals.tasks.json());
  res.status(200).json(res.locals.tasks);
});

app.post('/task', taskController.postTask, (req, res) => {
  res.status(200).json(res.locals.newItem);
});

app.post('/signin', authController.checkUser, (req, res) => {
  console.log('sign in');
});

app.delete('/task', taskController.deleteTask, (req, res) => {
  res.status(200).json(res.locals.deletedItem);
});

app.get('/', (req, res) => {
  res.set({ 'Content-Type': 'text/html; charset=UTF-8' });
  res.status(200).sendFile(path.resolve(__dirname, '../views/index.html'));
});

app.get('/secret', authController.checkCookie, (req, res) => {
  res.set({ 'Content-Type': 'text/html; charset=UTF-8' });
  res.status(200).sendFile(path.resolve(__dirname, '../views/secret.html'));
});

app.listen(PORT, () => console.log('sod off'));
