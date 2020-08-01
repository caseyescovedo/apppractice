const express = require('express');
const app = express();
const path = require('path');
const taskController = require('./controllers/taskController');

const PORT = 3333;

// Create a node server that listens on port 3333...
// To test this in terminal type in   node and location of file
// node server/server.js

// Serve index.html from views folder on '/'  (Login page for application)
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../views/index.html'));
});

// Serve secrets.html from views folder on '/secret'  (To-Do page for application)
// getTasks middleware from taskController file
app.get('/secret', taskController.getTasks, (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../views/secret.html'));
});

// postTask middleware from taskController file
app.post('/secret', taskController.postTask, (req, res) => {
  return res.status(200).json(res.locals.data);
});

// deleteTask middleware from taskController file
app.delete('/secret/item_id', taskController.deleteTask, (req, res) => {
  return res.status(200).json(res.locals.data);
});

/* 
Serve the CSS and JS that the html files are requesting from the assets folder 
*/

// This line uses express to do the same as the following two app.gets that are commented out
app.use('/assets', express.static(path.join(__dirname, '../assets')));

// app.get('/assets/css/style.css', (req, res) => {
//   return res.sendFile(path.join(__dirname, '../assets/css/style.css'));
// });

// app.get('/assets/js/index.js', (req, res) => {
//   return res.sendFile(path.join(__dirname, '../assets/js/index.js'));
// });

// Catch-All to handle unknown routes
app.use('*', (req, res) => {
  res.status(404).send('Bad Request');
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.log('Global error handler: ', err);
  res.status(500).send(err);
});

// Listen on port 3333
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
