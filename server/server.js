const express = require('express');
const PORT = 3333;
const app = express();
const router = require('./routes.js');
const path = require('path');

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static('views'));
app.use(express.static('assets'));

app.use('/secret', router);


app.use('/', (err, req, res, next) => {
  console.log(err);
});

app.listen(PORT, () => {
  console.log('Listening on port 3333');;
});

module.exports = app;