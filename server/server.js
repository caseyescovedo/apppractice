const express = require('express');
const path = require('path');
const taskController = require('./controllers/taskController.js');
const authController = require('./controllers/authController.js');

const app = express();
const PORT = 3333;

app.use(express.json());

// Serve assets folder for css and js files
app.use(express.static(path.resolve(__dirname, '../assets')));

// Serve controllers
app.post('/tasks', taskController.postTask);
app.get('/tasks', taskController.getTasks);
app.delete('/tasks', taskController.deleteTask);
app.post('/login', authController.verifyUser);
app.get('/secret', authController.cookieCheck);

// Serve sites
// app.use('/secret', (req, res) => res.sendFile(path.resolve(__dirname, '../views/secret.html')));
app.use('/', (req, res) => res.sendFile(path.resolve(__dirname, '../views/index.html')));

// Serve unknown paths
app.use((req, res) => res.sendStatus(404));

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log('errorObj.log is: ', errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
