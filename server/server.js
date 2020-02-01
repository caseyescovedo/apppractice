const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const PORT = 3333;

const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');
// middleware to parse incoming json body
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// middleware to parse cookies
app.use(cookieParser());

// flow test to see all incoming requests
app.use('/', (req, res, next) => {
  console.log(`**** FLOW TEST ****
    Method: ${req.method}
    url: ${req.url}
    body: ${JSON.stringify(req.body)}`);
  next();
});
// serve index file upon get requests to /
app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, '../views/index.html')));

// route for post requests to /signin
app.post('/signin', authController.verifyUser, authController.setCookie, (req, res) => res.redirect('/secret'));

// serve secret file when get requests are made to secret
app.get('/secret', authController.verifyCookie, (req, res) => res.sendFile(path.resolve(__dirname, '../views/secret.html')));

// statically serve files in the assests folder
app.use(express.static(path.resolve(__dirname, '../assets')));

// route for get requests to tasks
app.get('/tasks', taskController.getTasks, (req, res) => res.json([...res.locals.tasks]));
// route for post requests to tasks
app.post('/tasks', taskController.postTask, (req, res) => res.json(res.locals.task));
// route for deleting a task
app.delete('/tasks', taskController.deleteTask, (req, res) => res.sendStatus(200));


app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
