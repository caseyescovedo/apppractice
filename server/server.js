const express = require('express');
const path = require('path');

require('dotenv').config();

const { connectDB } = require('./models/TaskModel');

const app = express();

connectDB();

const port = process.env.PORT || 3333;

app.use(express.json());
app.use(express.static(path.resolve('./assets')));
app.use(require('cookie-parser')());

app.get('/', (req, res) => {
  res.sendFile(path.resolve('./views', 'index.html'));
});
app.get('/secret', (req, res) => {
  res.sendFile(path.resolve('./views', 'secret.html'));
});

app.use(function (err, req, res, next) {});

app.listen(port, () => {
  console.log(`App Assessment Mod 0 Backend API listening on ${port}`);
});
