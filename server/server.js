const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser');
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
app.use(express.json());

// serve static files
app.use('assets', express.static(path.join(__dirname,`../assets/`)));

// serve css


// default route
app.get('/', authController.setCookie, (req, res) => {
  res.status(200).sendFile(path.join(__dirname,`../views/index.html`));
})

// logged-in secret route
app.get('/secret',authController.createUser, (req, res) => {
  res.status(200).redirect('/secret');
})

// catch-all route
app.use('*', (req, res) => {
  res.sendStatus(404);
})

// enable server
app.listen(PORT, () => console.log(`Listening on Port: ${PORT} `));
