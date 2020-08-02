const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const taskController = require('./controllers/taskController.js');
const authController = require('./controllers/authController.js')

const app = express();
const PORT = 3333;

//app config for body and cookies
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

//serving static files
app.use('/css', express.static(path.join(__dirname, '../assets/css')));
app.use('/js', express.static(path.join(__dirname, '../assets/js')));


app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../views/index.html'));
});

app.post('/signin', authController.authenticate, authController.setCookie, (req, res) => {
  res.redirect('/secret');
})

app.get('/secret', authController.checkCookie, (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../views/secret.html'));
});


//CRUD routes for task
app.post('/task', taskController.postTask, (req, res) => {
  res.status(200).json(res.locals.data);
});

app.get('/task', taskController.getTasks, (req, res) => {
  res.status(200).json(res.locals.data);
})

app.delete('/task/:id', taskController.deleteTask, (req, res) => {
  res.status(200).json(res.locals.data);
})

//Bad Request Route
app.use('*', (req, res) => {
  res.status(404).send("Bad Request");
})

//Global Error Handler
app.use((err, req, res, next) => {
  res.status(500).send(err);
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))