const express = require('express');
const PORT = '3333';
const path = require('path'); // look if i can take this off
const cookieParser = require('cookie-parser');
const app = express();

const authController = require('./controllers/authController')
const taskController = require('./controllers/taskController');

// Parsing from requests
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());

// Don't know how to set the header
app.use(express.static(path.join(__dirname,'../assets')));

// Task functionality
app.post('/task', taskController.postTask, (req,res) => 
  res.json(res.locals.data));

app.get('/task', taskController.getTask, (req,res) => 
  res.json(res.locals.data)); 

app.delete('/task', taskController.deleteTask, (req,res) =>
  res.sendStatus(200));

app.use('/signin', authController.check, authController.setCookie, (req,res) => {
  if (res.locals.auth) 
    res.redirect('/secret');
  else
    res.status(401).send('unsuccessful login attempt');
});

// Private page task
app.get('/secret', authController.checkCookie, (req,res) => {
  if (res.locals.cookies) 
    res.sendFile(path.join(__dirname,'../views/secret.html'));
  else
    res.status(401).send('You must be signed in to view this page');  
});

// Public page login
app.get('/', authController.checkCookie, (req,res) => {
  if (res.locals.cookies) 
    res.redirect('/secret');
  else res.sendFile(path.join(__dirname,'../views/index.html'))
});

// Catch undefinied paths
app.use('*', (req,res) => 
  res.sendStatus(404));

// Global error handler
app.use((err,res,req,next) => 
res.sendStatus(400));

app.listen(PORT, () => console.log('Server starting listening to ',PORT))