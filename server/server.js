const express = require('express');
const path = require('path');

require('dotenv').config();

const { connectDB } = require('./models/TaskModel');
const routes = require('./routes');
const auth = require('./controllers/authController');

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

app.use('/tasks', routes);
app.post('/signin', auth.login, (req, res, next) => {
  res.status(200).json({ status: true, token: res.locals.token });
});

app.use(function (err, req, res, next) {
  if (err && err.log) {
    return res.status(500).json({ ...err, status: false });
  }
  res.status(500).json({ err: 'Error occured', message: err });
});

app.listen(port, () => {
  console.log(`App Assessment Mod 0 Backend API listening on ${port}`);
});
