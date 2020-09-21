const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const router = require('./routers/routes');
const authController = require('./controllers/authController');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('assets'));

// SEPARATION OF CONCERNS, ALL CRUD FUNCTIONALITY ROUTED TO THE /API ROUTER
app.use('/api', router, (req, res) => {
  console.log('API ROUTER WORKING');
});

app.get('/secret', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../views/secret.html'));
});

app.post('/signin', authController.validate, (req, res) => {
  console.log('AUTH ROUTE HERE');
  res.send('AUTH ROUTE WORKING');
});

app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../views/index.html'));
});

app.listen('3333', () => {
  console.log('Listening on Port 3333...');
});

module.exports = app;
