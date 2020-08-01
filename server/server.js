const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');

const PORT = 3333;
const app = express();

app.use(express.json());
app.use(cookieParser());

//--------STATIC-------\\
app.use('/', express.static(path.join(__dirname, '../views')));
app.use('/css', express.static(path.join(__dirname, '../assets/css')));
app.use('/assets', express.static(path.join(__dirname, '../assets')));

//--------SECRET------\\

app.get('/secret', (req, res) => {
  res.sendfile(path.join(__dirname, '../views/secret.html'));
});

//--------TASK-------\\
app.get('/task', taskController.getTasks, (req, res) => {
  res.status(200).json(res.locals.tasks);
});
app.post('/task', taskController.postTask, (req, res) => {
  res.status(200).json(res.locals.tasks);
});
app.delete('/task/:id', taskController.deleteTask, (req, res) => {
  res.status(200).json(res.locals.tasks);
});

//--------SIGN IN-------\\
app.post(
  '/signin',
  authController.login,
  authController.sendCookies,
  (req, res) => {
    console.log('past login middleware');
    res.json('PASSED');
  }
);

//--------ERROR HANDELING-------\\
app.use('*', (req, res) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error!');
});

//--------START SERVER------\\
app.listen(PORT, () =>
  console.log('listening on port', PORT, 'awaiting further instructions')
);
