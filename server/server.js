// Requirements ------------------------------------------------
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3333;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Controllers ----------------------------------------------------
const taskController = require('./controllers/taskController.js');
const authController = require('./controllers/authController.js');

// Routing --------------------------------------------------------

// POST /signin
app.post('/signin',
  authController.login,
  (req, res) => res.redirect(200, '/secret'));

// GET /tasks
app.get('/tasks',
  taskController.getTasks,
  (req, res) => res.status(200).json(res.locals.allTasks));

// POST /tasks
app.post('/tasks',
  taskController.postTask,
  (req, res) => res.status(200).json(res.locals.task));

// DETLE /tasks
app.delete('/tasks',
  (req, res) => res.sendStatus(200))

// GET /secret
app.get('/secret',
  (req, res) => res.status(200).sendFile(path.resolve(__dirname, '../views/secret.html')));

// GET /
app.get('/', 
  (req, res) => res.status(200).sendFile(path.resolve(__dirname, '../views/index.html')));

// USE /css/style.css
app.use('/css/style.css', (req, res) => {
  res
  .status(200)
  .set({'content-type': 'text/css'})
  .sendFile(path.resolve(__dirname, '../assets/css/style.css'))});

// USE /js/index.js
app.use('/js/index.js', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../assets/js/index.js'))});

// Global Error Hanlder
app.use((err, req, res, next) => {
  res.status(404).json({ Error: "Page Not Found" })
})

// Server Listening -----------------------------------------------
app.listen(PORT, () => console.log('Listening on ' + PORT));