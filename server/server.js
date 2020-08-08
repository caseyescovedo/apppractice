const express = require('express');
const PORT = 3333;
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const taskController = require('../server/controllers/taskController');
const authController = require('../server/controllers/authController');

// serve static files
app.use(express.static('assets'));
app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

// login page
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../views/index.html'));
});

// secret page
app.use('/secret', authController.checkCookie, (req, res) => {
  if (!res.string) {
    res.status(200).sendFile(path.join(__dirname, '../views/secret.html'));
  } else {
    res.status(200).end(res.string);
  }
});

// sign-in route
app.use('/signin', authController.authUser, (req, res) => {
  if (res.successlogin) {
    return res.redirect('/secret');
  } else {
    return res.status(200).end(res.auth);
  }
});

app.use('/getAllTasks/', taskController.getTask, (req, res) => {
  return res.status(200).json(res.data);
});

app.use('/postTask', taskController.postTask, (req, res) => {
  return res.status(200).json(res.data);
});

app.use('/deleteTask/:id', taskController.deleteTask, (req, res) => {
  return res.status(200);
});

// global handler
// app.use(function (err, req, res, next) {
//   console.error(err.err);
//   res.status(500).send('Something broke!');
// });

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
