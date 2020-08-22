const path = require('path');
const express = require('express');

const app = express();
const PORT = 3333;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const authController = require('./controllers/authController');
const apiRouter = require('./route');

// FORM VALUES WEREN'T COMING IN WITH EXPRESS.JSON() so using both... ????!!!!
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files
app.use('/assets', express.static(path.join(__dirname, '../assets')));

// routes/router for all task endpoints
app.use('/api', apiRouter);

// final endpoint for logged in users
app.get('/secret', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../views/secret.html'));
});

// LOGIN ROUTES
app.post('/login', authController.verify, authController.setCookie, (req, res) => {
  console.log('final endpoint');
  res.redirect('/secret');
});

app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../views/index.html'));
});

// 404 handler
app.use((req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
