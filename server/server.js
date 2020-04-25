const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');

const PORT = 3333;

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

//routes
app.get('/secret/task', taskController.getTasks, (req, res) => {
  res.status(200).json(res.locals.data)
})

app.get('/secret', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../views/secret.html'))
})
app.post('/secret', taskController.postTask, (req, res) => {
  res.status(200).json(res.locals.data)
})
app.delete('/secret/:id', taskController.deleteTasks, (req, res) => {
  res.status(200).json('something got deleted')
})

app.post('/signin', authController.login, authController.setCookie, (req, res) => {
  if (res.locals.success) {
    // console.log('redirect?')
    res.redirect(301, '/secret')
  }
  else {
    res.status(418).json('wrong login info')
  }
})


//serve static files
app.use('/css', express.static(path.join(__dirname, '../assets/css')))
app.use('/js', express.static(path.join(__dirname, '../assets/js')))

//serve index/login html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'))
})

//serve secret/task html file
app.get('/secret', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/secret.html'))
})

//catch all
app.use('*', (req, res) => {
  res.sendStatus(418);
})

//global error handler
app.use((err, req, res, next) => {
  console.error('global error handler inBRoked: ', err.message);
  res.sendStatus(500)
})

app.listen(PORT, () => console.log(`We're secretly listening to you on ${PORT}... muahahahha!`))