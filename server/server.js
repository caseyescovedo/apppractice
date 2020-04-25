const express = require('express');
const path = require('path');
var cookieParser = require('cookie-parser')
const PORT = 3333;

const taskController = require('./controllers/taskController')
const authController = require('./controllers/authController')

const app = express();

/* --------------------------------- Parsers -------------------------------- */

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

/* ------------------- Serving index.html & Static Assets ------------------- */

app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../views/index.html'));
});

app.get('/css/style.css', (req, res) => {
  res.status(200).set('Content-Type', 'text/css').sendFile(path.resolve(__dirname, '../assets/css/style.css'))
})

app.get('/js/index.js', (req, res) => {
  res.status(200).set('Content-Type', 'application/javascript').sendFile(path.resolve(__dirname, '../assets/js/index.js'))
})

/* ---------------------------------- Tasks --------------------------------- */

app.get('/tasks/get', taskController.getTasks, (req, res) => {
  res.status(200).json(res.locals.tasks)
})

app.post('/tasks/add', taskController.postTask, (req, res) => {
  res.sendStatus(200)
})

app.delete('/tasks/delete', taskController.deleteTask, (req, res) => {
  res.sendStatus(200)
})

/* ----------------------------- Authentication ----------------------------- */

app.post('/signin', authController.signIn, authController.setCookie, (req, res) => {
  res.redirect('/secret')
})

app.get('/secret', authController.checkCookies, (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../views/secret.html'));
});

/* -------------------------- Catch All 404 Handler ------------------------- */

app.use('/*', (req, res) => {
  res.status(404).send('ERROR page not found!')
})

/* -------------------------- Global Error Handler -------------------------- */

app.use((err, req, res, next) => {
  const defaultError = {
    log: 'Something went wrong in an unknown piece of middleware',
    msg: 'Global error handler triggered'
  }

  err = Object.assign({}, defaultError, err)
  console.log(err)
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
