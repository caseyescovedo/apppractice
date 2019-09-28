const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const authController = require('./controllers/authController');
const taskController = require('./controllers/taskController');

const app = express();
const PORT = 3333;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/assets', express.static(path.resolve(__dirname, '../assets')));

// route to login page
app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../views/index.html'));
});

// sign in and add cookie
app.post(
  '/signin',
  authController.signIn,
  authController.addCookie,
  (req, res) => {
    res.redirect('/secret');
  }
);

// route to tasks page
app.get('/secret', authController.verifyCookie, (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../views/secret.html'));
});

// get tasks
app.get('/tasks', taskController.getTasks, (req, res) => {
  res.status(200).json(res.locals.tasks);
});

// post task
app.post(
  '/secret',
  taskController.postTask,
  taskController.getTasks,
  (req, res) => {
    res.status(200).json(res.locals.tasks);
  }
);

// delete task
app.delete(
  '/secret/:id',
  taskController.deleteTask,
  taskController.getTasks,
  (req, res) => {
    res.status(200).json(res.locals.tasks);
  }
);

// global handler
app.use('*', (req, res) => {
  res.status(404).send('File not found');
});

// error handler
app.use((err, req, res, next) => {
  res.status(500).send(`Internal server error ${err}`);
});

// port listener
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
