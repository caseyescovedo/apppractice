const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser=require('cookie-parser');
const mongoose = require('mongoose');
const tasks = require('./controllers/taskController');
const auth = require('./controllers/authController');

const PORT = 3333;

const app = express();
app.use(cors());
app.use(cookieParser());

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
//app.set('Content-Type', 'json');

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});
app.get('/secret', auth.checkCookies, function (req, res) {
  res.sendFile(path.join(__dirname, '../views/secret.html'));
}); 

app.use('/', express.static(path.join(__dirname, '../assets')));

app.post('/tasks', 
tasks.postTask, (req, res) =>{
  return res.status(200).json(res.locals.task);
});

app.delete('/tasks', 
tasks.deleteTask, (req, res) =>{
  return res.status(200).json(res.locals.task);
});

app.get('/tasks', 
tasks.getTasks, (req, res) =>{
  return res.status(200).json(res.locals.tasks);
});

app.post('/signin', 
auth.checkLogin,  (req, res) =>{
  res.sendFile(path.resolve(__dirname, '../views/secret.html'))
}
); 


app.use(function (err, req, res, next) {
  if (err && err.log) {
    return res.status(500).json({ ...err, status: false });
  }
  res.status(500).send(err);
});

app.listen(PORT, () => console.log(`App started on port ${PORT}`));