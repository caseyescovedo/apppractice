const express = require('express');
const app = express();
const pool = require('./models/TaskModel');
const path = require('path');
const cors = require('cors');

// PORT NUMBER
const PORT = 3333;

// IMPORT URLENCODED FROM BODY PARSER
const { urlencoded } = require('body-parser');

// IMPORT ROUTER FROM ROUTES.JS
const router = require('./routes');

// PREVENT CORS ERRORS
app.use(cors());

// REQUIRE ALL INTERATION TO USE/PARSE JSON
app.use(express.json());

// HANDLE FORM DATA CORRECTLY
app.use(express.urlencoded({ extended: true }));

// SERVE STATIC FILES
app.use(express.static('assets'));

// ROUTE LOGIN
app.get('/', (req, res) => {
  res
    .status(200)
    .cookie('raisin', 7)
    .sendFile(
      '/Users/casesimmons/Codesmith/app-assessment-mod-0/views/index.html'
    );
});

// ROUTE SECRET
app.use('/secret', (req, res) => {
  res
    .status(200)
    .cookie('raisin', 7)
    .sendFile(
      '/Users/casesimmons/Codesmith/app-assessment-mod-0/views/secret.html'
    );
});

// ROUTE ALL METHODS TO ROUTER
// app.use('/api', router);

// GLOBAL CATCH ALL
app.use('/', (err, req, res, next) => {
  console.log('Golbal Error: ', err);
});

// LISTEN ON PORT 3333
app.listen(PORT, () => {
  console.log('I CAN HEAR YOU ON PORT 3333');
});
