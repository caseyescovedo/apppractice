const express = require('express');
const app = express();
const PORT = 3333;
const path = require('path');
const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');
const cookieParser = require('cookie-parser');

//parse cookies and req bodies
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//serve static files, content-type is set by express.static
app.use('/assets', express.static(path.join(__dirname, '../assets')));

//serve secret.html on the /secret route, content-type set by sendFile
app.get('/secret', authController.checkCookie, (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../views/secret.html'));
})

app.post('/api/post', taskController.postTask, (req, res) => {
  res.sendStatus(200);
})

app.use('/api/delete', taskController.deleteTask, (req, res) => {
  res.sendStatus(200);
})

//handle get request for tasks
app.get('/api', taskController.getTasks, (req, res) => {
  res.status(200).json(res.locals.tasks);
})

app.use('/signin', authController.authenticate, (req, res) => {
  //redirect to secret page upon signin
  res.status(200).redirect('/secret');
})

//serve index.html on opening localhost, content-type set by sendFile
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../views/index.html'));
})

//set server to listen on port 3333
app.listen(PORT, () => {
  console.log(`Listening on PORT:${PORT}`);
})