// import express
const express = require('express');
// app to run express
const app = express();
// prevent cors error in chrome browser
const cors = require('cors');
// import path
const path = require('path');
const { execPath } = require('process');
const router = require('./routes.js');

// port set to 3333
const PORT = 3333;

// cors invocation
app.use(cors());

// needed for interaction involving use/parse of JSON
app.use(express.json());

// handle any data that is incorrectly entered or not valid
app.use(express.urlencoded({ extended: true }));

// serving the static files in the assets folder
app.use(express.static('assets'));

// when localhost:3333 is visited it will take you to the home page
app.use(express.static('views'));

// when localhost:3333/secret is visited you will be taken to the todo page secret.html
app.get('/secret', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../views/secret.html'));
});

app.get('/secret', (req, res) => {
  res.send('Received a GET request');
});

app.delete('/secret', (req, res) => {
  res.send('Received a DELETE request');
});

app.post('/secret', (req, res) => {
  res.send('Received a POST request');
});

app.use('/', (err, req, res, next) => {
  console.log(err);
});

// server listening on PORT
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.export = app;
