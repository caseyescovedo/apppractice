const express = require('express');
const app = express();
const path = require('path');
const cookieparser = require('cookie-parser');

// === Controllers === //
const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');

// === Parsers === //
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

// === Serves static files === //
app.use(express.static(path.resolve(__dirname, '../views')))
app.use(express.static(path.resolve(__dirname, '../assets')))


// === PATHS === //
app.get('/retrieve', taskController.getTasks, (req, res) => {
  res.status(200).json(res.locals.tasks);
})

app.delete('/remove/:task', taskController.deleteTask, (req, res) => {
  res.status(200).json(res.locals.removed);
})

app.use('/add/:task', taskController.postTask, (req, res) => {
  res.status(200).json(res.locals.newtask);
})

app.use('/signin', authController.verifyUser, (req, res) => {
  console.log('should redirect to secret')
  res.redirect('/secret');
})

app.get('/secret', authController.checkCookie, (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/secret.html'))
})

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views'));
})



// ===== Catch-All ===== //
app.use((req, res, next) => {
  res.sendStatus(404);
})


// ===== Global Error Handler ===== //
app.use((err, req, res, next) => {
  const defaultErr = {
    status: 400,
    log: 'Global Error Handler',
    message: 'We got a middleware problem, y\'all'
  }
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.message);
  res.status(errorObj.status).json(errorObj.message);
})


// == listening == //
app.listen(3333)