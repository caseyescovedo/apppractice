const express = require('express');
const PORT = '3333';
const path = require('path'); // look if i can take this off
const app = express();

const taskController = require('./controllers/taskController');

// Parsing from requests
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

// Don't know how to set the header
app.use(express.static(path.join(__dirname,'../assets')));


app.post('/task', taskController.postTask, (req,res) => 
  res.json(res.locals.data));

app.get('/task', taskController.getTask, (req,res) => 
  res.json(res.locals.data)); 

app.delete('/task', taskController.deleteTask, (req,res) =>
  res.status(200).send('OK'));

// Private page task
app.get('/secret', (req,res) => 
  res.sendFile(path.join(__dirname,'../views/secret.html')));

// Public page login
app.get('/', (req,res) => 
  res.sendFile(path.join(__dirname,'../views/index.html')));

// Catch undefinied paths
app.use('*', (req,res) => 
  res.status(404).send());

// Global error handler
app.use((err,res,req,next) => 
  res.status(400).send());

app.listen(PORT, () => console.log('Server starting listening to ',PORT))