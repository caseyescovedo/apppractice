const express = require('express');
const PORT = 3333;
const app = express();
const path = require('path');
const taskController = require('./controllers/taskController.js');
const authController = require('./controllers/authController.js');
const bodyParser = require('body-parser');

// NEED IN ORDER TO PARSE REQUEST BODIES
app.use(bodyParser.json());

// SERVE ALL STATIC ASSETS UPON APP START
app.use(express.static(path.resolve(__dirname, '../assets')));

// SERVE index.html STATIC FILE
app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../views/index.html'));
});

app.post('/signin', authController.verifyUser, authController.setCookie, (req, res) => {
  if (res.locals.invalidUser) {
    return res.status(400).send(`unsuccessful login attempt`);
  }
  return res.redirect('/secret');
});

// SERVE secret.html STATIC FILE
app.get('/secret', authController.checkCookie, (req, res) => {
  if (res.locals.notAuthenticated) {
    return res.status(400).send(`You must be signed in to view this page`);
  }
  return res.status(200).sendFile(path.resolve(__dirname, '../views/secret.html'));
});

// SERVE ALL TASKS
app.get('/api/tasks', taskController.getTasks, (req, res) => {
  if (res.locals.tasks) {
    return res.status(200).json(res.locals.tasks);
  }

  return res.status(404).json({ success: false });
});

// SERVE THE NEWLY CREATED TASK
app.post('/api/tasks', taskController.postTask, (req, res) => {
  if (res.locals.task) {
    return res.status(200).json(res.locals.task);
  }

  return res.status(404).json({ success: false });
});

// DELETE DOCUMENT IN Tasks COLLECTION THAT CORRESPONDS W/ _id IN REQUEST 
app.delete('/api/tasks/:taskId', taskController.deleteTask, (req, res) => {
  return res.status(200).end();
});

// Catch all error handler
app.get('*', (req, res) => {
  return res.status(404);
})

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  return res.status(500).send(`Something broke! Here:\n' ${{ error: err }}`);
});


app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}...`));
