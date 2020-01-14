const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');

const PORT = 3333;

const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');

// use body-parser for post requests dealing with req.body
app.use(express.json());

// use cookie-parser to parse cookies
app.use(cookieParser());

// server index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
})

// serve secret.html after checking cookie
app.get('/secret', authController.checkCookie, (req, res) => {
  res.sendFile(path.join(__dirname, '../views/secret.html'));
})

// serve static files
app.use('/assets', express.static(path.join(__dirname, '../assets')));

// middlewares/routes
app.get('/secret/items', taskController.getTasks, (req, res) => {
  res.status(200).json(res.locals.tasks);
})

app.post('/secret/items', taskController.postTask, (req, res) => {
  res.status(200).json(res.locals.data);
})

app.delete('/secret/items/:id', taskController.deleteTask, (req, res) => {
  res.status(200).json(res.locals.deleted);
})

// sign in form route, checks user login and pw, sets and sends back a cookie
app.post('/signin', authController.checkUser, authController.setCookie, (req, res) => {
  res.status(200).redirect('/secret')
})

// error handlers for incorrect route & global error handling
app.use('*', (req,res) => {
  res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Server Error');
});

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}...`))
