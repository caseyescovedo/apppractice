const express = require('express');
const path = require('path');
const app = express();
const port = 3333;

const authController = require('./controllers/authController');

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');


// import routers middleware
const tasks = require('./routers/tasks');
const auth = require('./routers/auth');


app.use(cookieParser());

app.use(express.urlencoded())
app.use(bodyParser.json());


// Flow Test
app.use((req, res, next) => {
  console.log(`
  ${req.method} -- method
  ${req.url} -- url
  ${JSON.stringify(req.body)} -- body
  ${JSON.stringify(req.cookies)} -- cookies
  `);
  next();
});

// use task and auth middleware when directed
app.use('/task', tasks);
app.use('/auth', auth);

// to handle the specific route inside the form to redirect to secret
app.use('/signin', authController.login, authController.setCookie, (req, res) => {
  res.sendFile(path.join(__dirname, '../views/secret.html'));
});

// route to the index file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

// route to secret file
app.get('/secret', authController.checkCookie, (req, res) => {
  res.sendFile(path.join(__dirname, '../views/secret.html'));
});

// serves up all css files
app.use('/css', express.static(path.join(__dirname, '../assets/css/')), (req, res, next) => {
  next();
});

// servers up all javascript files
app.use('/js', express.static(path.join(__dirname, '../assets/js/')), (req, res, next) => {
  next();
});


// app listening on port 3333
app.listen(port, () => console.log(`Example app listening on port ${port}!`))