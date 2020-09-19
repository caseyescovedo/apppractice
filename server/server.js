const express = require('express');
const app = express();
const path = require('path');
const PORT = 3333;

// Import task controller
const taskController = require('./controllers/taskController');

// Parse request body
app.use(express.json());

// Serve static files in assets
app.use(express.static('assets'));

// Serve secret.html on secret route
app.use('/secret', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/secret.html'))
});

// Routes to post, get, and delete tasks
// Adds new item
app.post('/tasks', taskController.postTask, (req, res) => {
  res.status(200);
  res.json(res.locals.posted);
});
// Gets all items
app.get('/tasks', taskController.getTasks, (req, res) => {
  res.status(200);
  res.json(res.locals.items);
})
// Deletes item
app.delete('/tasks', taskController.deleteTask, (req, res) => {
  res.status(200);
  res.json(res.locals.deleted);
})

// Serve index.html on slash route
app.use('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/index.html'))
});

// Error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express caught middleware error in taskController.postTask',
    status: 500,
    message: {err: 'An error occurred'}
  }
  // Change defaultErr based on error message that comes back
  const errResponse = Object.assign({}, defaultErr, err);
  console.log(errResponse.log);
  res.status(errResponse.status);
  res.json(errResponse.message);
  return;
});

app.listen(PORT, () => {
  console.log('Server listening on port:', PORT)
});