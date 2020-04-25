const express = require('express');
const path = require('path');
const router = require('./router');
const cookieparser = require('cookie-parser');

const app = express(); // makes an express instance

// handle parsing
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieparser());

// handle static requests
app.use('/', express.static(path.join(__dirname, '../assets')));

// handle get to homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

// handle get to secret page
app.get('/secret', (req, res) => {
  if (req.cookies.token !== 'admin')
    res.status(500).send('You must be signed in to view this page');
  res.sendFile(path.join(__dirname, '../views/secret.html'));
});

// handle auth requests
app.use('/signin', router);

//setup all other routes to go to router
app.use('/', router);

// handle invalid paths with *
app.get('*', (req, res) => {
  res.sendStatus(500);
});
// make an error handler
const errorHandler = (err, req, res, next) => {
  res.status(400).send('An error occurred: ', err);
};

// activate server on port
app.listen(3333, () => {
  console.log('Server up and running');
});
