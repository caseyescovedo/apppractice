const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const path = require('path');

const taskController = require('./controllers/taskController.js');
const authController = require('./controllers/authController.js');


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// DISPLAY MAIN HTML FILE
app.use(express.static(path.join(__dirname, '../views/')));

// SERVE CSS and JS
app.use(express.static(path.join(__dirname, '../assets')));


// AFTER SUCCESFUL LOG IN
app.use('/signin', authController.verifyUser, authController.verifyToken, (req, res) => res.status(200).redirect('/secret.html'));

// POST REQUEST
app.post('/create', taskController.postTask, (req, res) => {
  console.log('creating task');
  return res.status(200);
});

// GET REQUEST
app.get('/tasks', taskController.getTasks, (req, res) => res.status(200).json(res.locals.tasks));

// DELETE REQUEST
app.get('/delete', taskController.deleteTask, (req, res) => res.status(200).json(res.locals.tasks));

// ERROR HANDLER FOR ALL ENDPOINTS
app.use((req, res) => res.sendStatus(404)); // 404 NOT FOUND

// =============== GLOBAL ERROR HANDLER =============== //
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(3333); // listens on port 3333 -> http://localhost:3333/

module.exports = app;
