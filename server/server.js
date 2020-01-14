const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3333;
const taskController = require('./controllers/taskController.js');
const authController = require('./controllers/authController.js');

app.use(express.json());

//serve index html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

//serve secret html
app.get('/secret', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/secret.html'));
});

//serve css static file
app.get('/css/style.css', (req, res) => {
  res.sendFile(path.join(__dirname, '../assets/css/style.css'));
});

//serve js static file
app.get('/js/index.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../assets/js/index.js'));
});

//verify user upon /signin and set cookie
app.post('/signin', authController.verifyUser, authController.setCookie, (err, req, res) => {
  if (err) {
    res.send('You must be signed in to view this page')
  }
  else res.redirect('/secret')
})

//get tasks
app.get('/tasklist', taskController.getTasks, (req, res) => {
  res.status(200).json(res.locals.tasks);
});

//post tasks
app.post('/tasklist', taskController.postTask, (req, res) => {
  res.status(200).json(res.locals.tasks);
});

//delete tasks
app.delete('/tasklist/:id', taskController.deleteTask, (req, res) => {
  res.status(200).json(res.locals.tasks);
});

//catch-all error handler
app.get('*', (req, res) => {
  res.sendStatus(404)
});

//global error handler
app.get((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' }
  };
  return res.status(defaultErr.status).json(defaultErr.message);
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));
