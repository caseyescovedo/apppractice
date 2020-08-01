const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const PORT = 3333;

const taskController = require('./controllers/taskController');
// const authController = require('./controllers/authController');

app.use(express.json());
app.use(express.urlencoded( { extended: true } ));

// import('../assets/css')
app.use(express.static('assets'))
app.use(cookieParser());


app.get('/',(req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../views/index.html'))
})

app.post('/signin', (req, res) => {
  const {user, pass} = req.body;
  if (user === 'codesmith' && pass === 'ilovetesting') {
    res.cookie('hi', 'there', {
      maxAge: 360000
    })
    res.redirect('/secret')
  } else {
    console.log('unsuccessful login attempt')
  }
})

app.get('/secret', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../views/secret.html'))
})

app.get('/api/secret', taskController.getTasks, (req, res) => {
  return res.status(200).json(res.locals.data)
})


app.post('/api/secret', taskController.postTask, (req, res) => {
  return res.status(200).json(res.locals.data)
})

app.delete('/api/secret/:id', taskController.deleteTask, (req, res) => {
  return res.status(200).json(res.locals.data)
})

app.use('*', (req, res) => {
  return res.sendStatus(404);
})

app.use((err, req, res, next) => {
  console.log(err);
  return res.sendStatus(500)
})


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})