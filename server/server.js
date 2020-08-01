// require express framework
const express = require('express');
// create app, which is an instance of express()
const app = express();
// require path module for dynamic paths (best practice)
const path = require('path');
// declare port variable
const PORT = 3333;

// import taskController to access middleware
const taskController = require('./controllers/taskController');

// parse request bodies that come in as either json or request bodies in html form
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// bundle and send static files (style.css and index.js)
app.use('/secret', express.static(path.join(__dirname, '../assets')))

// serve log-in page
app.get('/', (req, res, next) => {
  console.log('Received get request to home route.');
  res.status(200).sendFile(path.join(__dirname, '../views/index.html'))
});

// serve secret page
app.get('/secret', (req, res, next) => {
  console.log(`Received get request to secret route.`);
  res.status(200).sendFile(path.join(__dirname, '../views/secret.html'))
});



// POST request to add an item to the Task table
app.post('/secret/tasks', taskController.postTask, (req, res, next) => {
  console.log(`Received post request to add a task.`);
  res.status(200).json(res.locals.data);
})

// GET request for all items in Tasks table
app.get('/secret/tasks', taskController.getTasks, (req, res, next) => {
  console.log(`Received get request to tasks route.`);
  res.status(200).json(res.locals.data);
})

// DELETE request for single item in Tasks table
app.delete('/secret/tasks/:id', taskController.deleteTask, (req, res, next) => {
  res.status(200).json(res.locals.data);
})



// open the server
app.listen(PORT, () => { console.log(`Server listening on ${PORT}...`) });