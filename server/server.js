const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');

const { postTask, getTask, deleteTask } = require('./controllers/taskController')
const { saveUserCookie } = require('./controllers/authController')

const PORT = 3333;

// parse cookies
app.use(cookieParser());

// parse req body:
app.use(express.json());

// send static files
app.use('/', express.static(path.resolve(__dirname, '../assets')))

// serve html files
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/index.html'));
});

app.get('/secret', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/secret.html'));
});

// task and db routing
app.get('/tasks', getTask);

app.post('/tasks', postTask);

app.delete('/tasks', deleteTask);


// cookie authentication
app.post('/signup', saveUserCookie, (req, res) => {
    res.redirect('/secret');
});

// error handler for unknown routes
app.use((req, res) => {
  return res.status(404).send('Page not found');
});


app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});