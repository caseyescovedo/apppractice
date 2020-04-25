const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const PORT = 3333;

const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');

app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
})

app.post('/signin', authController.verifyUser, authController.setCookie, (req, res) => {
  if (res.locals.success) res.redirect('/secret');
})


app.use('/css', (req, res) => {
  res.sendFile(path.join(__dirname, '../assets/css/style.css'));
})

app.use('/js', (req, res) => {
  res.sendFile(path.join(__dirname, '../assets/js/index.js'));
})

app.get('/secret', authController.isLoggedIn, (req, res) => {
  if (res.locals.loggedIn) res.sendFile(path.join(__dirname, '../views/secret.html'));
  else res.redirect('/'); 
})

app.post('/secret/tasks', taskController.postTask, (req, res) => {
  res.json(res.locals.data);
})

app.get('/secret/tasks', taskController.getTasks, (req, res) => {
  res.json(res.locals.data);
})

app.delete('/secret/tasks/:id', taskController.deleteTask, (req, res) => {
  res.json(res.locals.data);
})

app.use('*', (req, res) => {
  res.status(404).send('This is not the page you are looking for');
})

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ err: 'An error occured' });
})
app.listen(PORT, () => console.log(`Server listening at port ${PORT}...`));