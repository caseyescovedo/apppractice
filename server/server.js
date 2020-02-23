const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');

const AuthController = require('./controllers/authController.js');
const TaskController = require('./controllers/taskController.js');

const app = express();
const PORT = 3333;


// ! Where should this go? In server or here?
mongoose.connect('mongodb+srv://nabramow:gradmongo!@cluster0-ufsoo.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, (err, database) => {
  if (err) return console.log(err);
  console.log('connected to mongoose!');
});


/* built in express bodyParser from version 4.16+
 * urlencoded method extracts data from the <form> element
 * and adds that data to the body property of the request object
 */

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json(), cookieParser(), express.urlencoded({ extended: false }));

// serve static files from assets folder

// ! I still don't really understand what this views page is for
app.use('/assets/', express.static(path.resolve(__dirname, '../assets')));
app.use('/views/', express.static(path.resolve(__dirname, '../views')));

// app.use(express.static('../assets/'), express.static('views'));

/*  route handlers */

// route to taskController.postTask middleware in taskController file
app.post('/tasks/add', TaskController.postTask);

// route to taskController.deleteTask middleware in taskController file
app.delete('/tasks/:id', TaskController.deleteTask);

// redirects user to signin page after submitting the login form
app.post('/signin', AuthController.verifyUser, AuthController.setCookie, AuthController.userLogin);

app.get('/secret', AuthController.checkCookie, (req, res) => {
  // check for cookie via middleware before rendering
  // ! not sure if I should render this here or in my authController?
  res.status(200).sendFile(path.join(__dirname, '../views/secret.html'));
});

// route to taskController.getTasks middleware to return tasks from db
app.get('/tasks', TaskController.getTasks);

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../views/index.html'));
});

// global error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!');
});

app.listen(3333, () => {
  console.log(`listening on ${  PORT}`);
});
