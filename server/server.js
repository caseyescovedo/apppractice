const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3333;
const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');

app.use(express.static('assets'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

app.get('/secret', (req, res) => {
  if(Object.keys(req.cookies).includes('token') && req.cookies.token === 'admin') {
    res.status(200).sendFile(path.resolve(__dirname, '../views/secret.html'));
  }
  else {
    res.send('You must be signed in to view this page');
  }
});

app.get('/api', taskController.getTasks, (req, res) => {
  res.status(200).json(res.locals.tasks);
});

app.post('/api', taskController.postTask, (req, res) => {
  res.status(200).send('will update');
});

app.delete('/api', taskController.deleteTask, (req, res) => {
  res.status(200).send('will update');
});

app.post('/signin', authController.authenticate, (req, res) => {
  if(res.locals.auth === 'success') {
    res.status(200).cookie('token', 'admin').redirect('/secret');
  } else {
    res.send('unsuccessful login attempt');
  }
});

app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../views/index.html'));
});

app.listen(PORT, () => {
  console.log('hear you loud and clear on 3333');
});