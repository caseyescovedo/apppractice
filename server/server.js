const express = require('express');
const app = express();
const path = require('path');
const taskController = require('./controllers/taskController');
const PORT = 3333;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve CSS and JS static files in assets folder
app.use(express.static('assets'));

// Serve index.html in views folder (login page) when '/' is visited
app.get('/', function(req, res) {
    res.status(200)
    .sendFile(path.resolve(__dirname, '../views/index.html'));
})

// Serve secret.html in views folder (to-do app) when '/secret' is visited
app.get('/secret', function(req, res) {
    res.status(200)
    .sendFile(path.resolve(__dirname, '../views/secret.html'));
})


// Tasks route for CRUD functionality
// Get tasks
app.get('/tasks', taskController.getTasks, function(req, res) {
    res.status(200).json(res.locals.allTasks)
})
// Post tasks
app.post('/tasks', taskController.postTask, function(req, res) {
    res.status(200).json(res.locals.task)
})
// Delete tasks
app.delete('/tasks/:id', taskController.deleteTask, function(req, res) {
    res.status(200).json();
})

// Port listen
app.listen(PORT, () => {
    console.log(`We are listening on ${PORT}!!`)
})

module.exports = app;