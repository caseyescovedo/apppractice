const express = require('express');
const path = require('path');
const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');
const cookieParser = require('cookie-parser');
const PORT = 3333;
const app = express();

app.use(cookieParser());
// takes place of body parser
app.use(express.json());

// serves static files
app.use(express.static('assets'))

// serves up index.html login page
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/index.html'));
})

// serves up secret page after sign-in
app.get('/signin', authController.setCookie, authController.checkCookie, (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/secret.html'));
})

app.get('/secret', authController.checkCookie, (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/secret.html'));
})

app.post('/newTask', taskController.postTask, (req, res) => {
  res.status(200).json('created a new task');
});

app.get('/getTasks', taskController.getTasks, (req, res) => {
  res.status(200).json(res.locals.allTasks);
})

app.delete('/delete', taskController.deleteTask, (req, res) => {
  res.sendStatus(200);
})


// catch-all error handler
app.use((req, res) => {
  res.sendStatus(404);
})

// error handler for middleware 
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occured' }
  }
  const errObject = Object.assign(defaultErr, err);
  console.log(errObject);
  res.status(errObject.status).json(errObject.message);
})

app.listen(PORT, function(){
  console.log(`listening on port ${PORT}`);
})