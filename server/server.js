const path = require("path");
const express = require("express");
var cookieParser = require('cookie-parser')
const app = express();
const PORT = 3333;

const taskController = require('./controllers/taskController.js');
const authController = require("./controllers/authController.js");

// NEED THESE
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

// SERVE STATIC FILES
app.use(express.static('assets'))
app.use(express.static(path.join(__dirname, '../views/index.html'))) //Set content-type header?


// GET ROUTES
app.get('/', (req,res) => {
  res.status(200).sendFile(path.join(__dirname, '../views/index.html'));
});

app.post('/signin', authController.checkCredentials, (req, res) => {
  res.status(302).redirect('/secret');
});

app.get('/failedAuth', (req, res) => {
  res.status(200).send('you must be signed in to view this page');
})

app.get('/secret', authController.checkCookies, (req,res) => {
  res.status(200).sendFile(path.join(__dirname, '../views/secret.html'));
});

app.get('/tasks', taskController.getTasks, (req, res) => {
  res.status(200).json(res.locals.allTasks);
});

app.post('/tasks', taskController.postTask, (req, res) => {
  res.status(200).json(res.locals.newTask);
});

app.delete('/tasks/:_id', taskController.deleteTask, (req, res) => {
  res.status(200).json({deletedTaskId: res.locals.deletedTaskId});
});

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Global error handler caught unknown middleware error',
    status: 400,
    message: {
      err: 'An error occurred',
    },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});


app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});