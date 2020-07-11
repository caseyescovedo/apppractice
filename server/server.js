const express = require('express');
const path = require('path');
const morgan = require('morgan');
const colors = require('colors');

const app = express();

const PORT = 3333;

// Body parser
app.use(express.json());

// Dev logging middleware
app.use(morgan('dev'));

app.use(express.static(path.resolve(__dirname, '../assets')));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`.yellow.bold));
