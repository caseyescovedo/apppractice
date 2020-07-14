const express = require('express');
const path = require('path');
const { postTask, getTasks } = require('./controllers/taskController');

// create express app
const app = express();
const port = 3333;

// Middleware for POST and PUT request to the server
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Middleware to serve static files
app.use(express.static('assets'));

// Router modules
// const auth = require('./routes/auth');

// serve css and JS files
app.get('/css/styles.css', (req, res, next) => {
  res.setHeader('Content-type', 'text/css');
  res.sendFile(path.resolve(__dirname, 'css/style.css'));
});

app.get('/assets/js/index.js', (req, res, next) => {
  res.setHeader('Content-Type', 'text/javascript');
  res.sendFile(path.resolve(__dirname, 'js/index.js'));
});

// Main landing route
app.get('/', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, '../views/index.html'));
});

// secret route
app.get('/secret', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, '../views/secret.html'));
});
const { Task, db } = require('./models/TaskModel');

app.post('/post-task', async (req, res) => {
  const { taskData } = req.body;
  postTask(req, res);
});

app.get('/display-task', async (req, res) => {
  try {
    const tasks = await getTasks(req, res);

    res.json(tasks);
  } catch (err) {
    console.error(`Error sending todos: ${err}`);
  }
});

// Authentication routes for login and signup
// app.use('/auth', auth);

app.get('*', (req, res) => {
  res.status(404).send('<h1 style="text-align: center; color: salmon;">404 - Page Not Found</h1>');
});

app.listen(port, () => console.log(`App running at: http://localhost:${port}`));
