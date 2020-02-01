/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const flowTest = require('./utils/flowTest');

const PORT = 3333;

const app = express();

app.use(
  // make cookies readable by expres
  cookieParser(),
  // make body readable by express
  express.json(),
  // debugging assistant
  flowTest,
  // serve files from assets folder
  express.static(path.resolve(__dirname, '../assets')),
  // (req, res, next) => console.log(res.headers),
);

// hello world route
// app.use((req, res, next) => res.send('hi :)'));

// serve index.html as home page
app.get('/',
  (req, res) => res.sendFile(path.resolve(__dirname, '../views/index.html')));


// serve index.html as home page
app.get('/secret',
  (req, res) => res.sendFile(path.resolve(__dirname, '../views/secret.html')));


// global error handler
app.use((err, req, res) => {
  console.log('Something broke:\n', err);
  res.status(500);
  return res.render('Error: ', { error: err });
});


app.listen(PORT, () => console.log('listening on PORT: ', PORT));
