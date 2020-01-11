const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const fs = require('fs');

//create app
const app = express();
// define port
const PORT = 3333;

//require model
const db = require('./models/TaskModel');

//require controllers
const authController = require('./controllers/authController');
const taskController = require('./controllers/taskController');


// parsing json
// app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// serve static files
app.use('assets', express.static(path.join(__dirname,`../assets/`)));

// serve css
app.get('/css/style.css', (req, res) => {
  res.status(200).sendFile(path.join(__dirname,`../assets/css/style.css`));
})

// serve index.js
app.get('/js/index.js', (req, res) => {
  res.status(200).sendFile(path.join(__dirname,`../assets/js/index.js`));
})

// default route
app.get('/', authController.setCookie, (req, res) => {
  res.status(200).sendFile(path.join(__dirname,`../views/index.html`));
})

// sign-up route
app.post('/signup', authController.createUser, (req, res) => {
  res.status(200).redirect('/secret');
})

// sign-in route
app.post('/signin', authController.verifyUser, (req, res) => {
  res.status(200).redirect('/secret');
})

// logged-in secret route
app.get('/secret',authController.verifyUser, (req, res) => {
  res.status(200).sendFile(path.join(__dirname,`../views/secret.html`));
})


//Task Routes
// get tasks
// logged-in secret route
app.get('/getTasks',taskController.getTasks, (req, res) => {
  res.json(res.locals.data);
})

// create task item
app.post('/createTask', taskController.createTask, (req, res) => {
  res.json(res.locals.data);
})

// catch-all route
app.use('*', (req, res) => {
  res.sendStatus(404);
})

// error handling
app.use((err, req, res, next) => {
  console.log(err);
  res.sendStatus(404);
})

// enable server
app.listen(PORT, () => console.log(`Listening on Port: ${PORT} `));
