/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const express = require('express');
const cookieParser = require('cookie-parser');

const path = require('path');
const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');

const app = express();

const PORT = 3333;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/assets', express.static(path.join(__dirname, '../assets')));

app.get('/', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.status(200).sendFile(path.join(__dirname, '../views/index.html'));
});
app.get('/secret',
  authController.checkCookie,
  (req, res) => {
    res.set('Content-Type', 'text/html');
    res.status(200).sendFile(path.join(__dirname, '../views/secret.html'));
  });
app.get('/items',
  taskController.getTasks,
  (req, res) => {
    res.status(200).json(res.locals.data);
  });
app.post('/items',
  taskController.postTask,
  (req, res) => {
    res.status(200).json(res.locals.data);
  });
app.delete('/items',
  taskController.deleteTask,
  (req, res) => {
    res.status(200).json(res.locals.data);
  });
app.post('/signin',
  authController.login,
  (req, res) => {
    res.sendStatus(200);
  });

app.use('*', (req, res) => res.sendStatus(404));

app.use((err, req, res, next) => res.status(500).send('Error!'));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
