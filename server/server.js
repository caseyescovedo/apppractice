const express = require('express');
const app = express();
const PORT = 3333;
const cors = require('cors');
const path = require('path');
const router = require('./routes.js');

app.use(cors());
// all interactions will be parsed
app.use(express.json());
// handles form data
app.use(express.urlencoded({ extended: true }));

// serve assets folder
app.use(express.static('assets'));
app.use('/secret', express.static('assets'));
// serve login page
app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../views/index.html'))
});

// serve secret page
app.get('/secret', (req,res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../views/secret.html'))
});

app.use('/api', router);
//app.use('/signin', router);

// handle error
app.use('/', (err, req, res, next) => {
  console.log(err);
});

// listen on this port
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});

module.exports = app;