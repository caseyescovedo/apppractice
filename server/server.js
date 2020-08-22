const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const db = require('./models/TaskModel.js');

const taskController = require('./controllers/taskController.js');
const authController = require('./controllers/authController.js');

// Create the server
const app = express();

// Parse body and cookies
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());

// Serve static files (CSS, JS, etc.)
app.use(express.static(path.resolve(__dirname, '../assets')));

// Signin
app.post('/signin',
  authController.verifyUser,
  authController.setAdminCookie,
  (req, res) => {
    return res.redirect('/secret');
  }
);

// Get all tasks
app.get('/tasks', taskController.getTasks);

// Make a new task
app.post('/tasks',
  taskController.postTask,
  (req, res) => {
    return res.status(200).json({itemId: res.locals.itemId});
  }
);

// Delete a task
app.delete('/tasks',
  taskController.deleteTasks,
  (req, res) => {
    return res.sendStatus(200);
  }
);

// Todo Page
app.get('/secret',
  authController.verifyAdminCookie,
  (req, res) => {
    return res.sendFile(path.resolve(__dirname, '../views/secret.html'));
  }
);

// Landing Page
app.get('/', (req, res) => {
  return res.sendFile(path.resolve(__dirname, '../views/index.html'));
});

// Listen
app.listen(3333, () => console.log('Server listening on port 3333'));
