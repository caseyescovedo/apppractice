// Express
const express = require('express');
const app = express();
const port = 3333;
const bodyParser = require('body-parser');
// Node.js
const path = require('path');
// Controllers
const authController = require('./controllers/authController');
const taskController = require('./controllers/taskController');

//////////////////
// STATIC ASSETS
app.use('/secret/css', express.static(path.join(__dirname, '../assets/css')));
app.use('/secret/js', express.static(path.join(__dirname, '../assets/js')));

////////////////
// BODY PARSER
app.use(bodyParser.json());

//////////////////
// DEFAULT LOGIN
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
})


/////////////////
// AUTHENTICATE
app.get('/secret', authController.isLoggedIn, (req, res) => {
  if (res.locals.isLoggedIn) {
    return res.sendFile(path.join(__dirname, '../views/secret.html'));
  }
})

/////////////////
// TASKS
app.get('/secret/getTasks', authController.isLoggedIn, taskController.getTasks, (req, res) => {
    if (res.locals.isLoggedIn) {
      console.log(`res.locals.getTasks = ${res.locals.getTasks}`);
      return res.status(200).send(res.locals.getTasks)
    }
})

app.post('/secret/deleteTask', authController.isLoggedIn, taskController.deleteTask, (req, res) => {
    console.log('/secret/deleteTask');
      return res.status(200).send({});
})

app.post('/secret/addTask', authController.isLoggedIn, taskController.postTask, (req, res) => {
  console.log('/secret/addTask');
    return res.status(200).send({});
})








app.listen(port, () => console.log(`Listening on port: ${port}`))

