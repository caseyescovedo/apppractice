/** ===== Import libraries and routes ===== */
const path = require('path');
const express = require('express');
const taskController = require('./controllers/taskController');


/** ===== Create instance of express server ==== */ 
const server = express();

/** ===== Parsers ===== */
server.use(express.json());
server.use(express.urlencoded({ extended: true }));


/** ===== Routes ===== */
// Serve static files
server.use(express.static(path.resolve(__dirname, '../assets')));


// Route request for tasks
server.get('/tasks', taskController.getTasks, (req, res, next) => {
  return res.status(200).json(res.locals.tasks);
});

server.post('/tasks', taskController.postTask, (req, res, next) => {
  return res.status(200).json(res.locals.newTask);
});

server.delete('/tasks', taskController.deleteTask, (req, res, next) => {
  return res.status(200).json(res.locals.deletedTask);
});


// Serve secret.html
server.get('/secret', (req, res) => {
  return res
    .header('Content-Type', 'text/html; charset=utf-8')
    .sendFile(path.resolve(__dirname, '../views/secret.html'));
});

// Serve index.html
server.get('/', (req, res) => {
  res
  .header('Content-Type', 'text/html; charset=utf-8')
  .sendFile(path.resolve(__dirname, '../views/index.html'));
});



/** ===== General error handling ===== */
server.use((err, req, res, next) => {
  const generalError = {
    log: 'Caught unknown middleware error',
    status: 400,
    message: { err: 'An error occured '}
  }

  const specificError = Object.assign(generalError, err)

  console.log(specificError.log);
  return res.status(specificError.status).json(specificError.err);
})


/** ===== Open server ===== */
server.listen('3333', () => {
  console.log('listening on port 3333');
});