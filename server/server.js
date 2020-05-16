const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// import controllers
const { getTasks, postTask, deleteTask} = require('./controllers/taskController');
const { authenticate, authorize } = require('./controllers/authController');

// set port
const PORT = 3333;

// Serve the static assets
app.use(express.static('assets'));
// Parse body as JSON
app.use(bodyParser.json());
// To get the form data
app.use(bodyParser.urlencoded({ extended: true }));
// Parse cookies
app.use(cookieParser());

// Main Routes
app.get('/', (req, res, next) => {
  res.sendfile(path.join(__dirname, '../views/index.html'));
})
app.get('/secret', authorize);
app.post('/signin', authenticate);

// Routes for accessing DB
app.get('/tasks/', getTasks);
app.post('/tasks/new', postTask);
app.delete('/tasks/:id', deleteTask);

// Global Error Handler
app.use((err, req, res, next) => {
  console.log("Error: ", err);
  res.status(500).send("There was an error")
})

// Open server on PORT
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
