const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dbRouter = require('./routers/dbRouter');
const authRouter = require('./routers/authRouter');
// for testing
const db = require('./models/TaskModel');

const app = express();
const PORT = 3333;

// parse our request bodies for post requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// so we can access the CSS and JS
app.use(express.static(path.join(__dirname, '../assets')));

// route handler for database functionality
app.use('/db', dbRouter);

app.get('/db', (req, res, next) => {
  db.query('select * from Tasks')
    .then((result) => JSON.parse(result))
    .then((data) => res.status(200).json(data))
    .catch((error) => next(error));
});

// route handler for authentication
app.use('/auth', authRouter);

// show the home page on the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

// show the to-do list app on the secret path
app.get('/secret', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/secret.html'));
});

// to catch unknown routes and send back a 404 error
app.get('*', (req, res) => {
  console.log('hit an unknown route');
  res.sendStatus(404);
});

// catch-all error handler
app.use((err, req, res, next) => {
  console.log('uncaught middleware error in express server ');
  console.log(err.message);
});

// start the server on the port we defined
app.listen(PORT, () => console.log(`Listening at localhost:${PORT}`));
