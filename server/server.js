const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const apiRouter = require('./routes/api');
const authController = require('./controllers/authController');

// PORT
const PORT = 3333;
const app = express();

app.use(bodyParser.urlencoded({ extended: true })); // parse url encoded
app.use(bodyParser.json()); // parse application json
app.use(cookieParser());
app.use(express.static('views')); // serve views directory
app.use(express.static('assets')); // serve assets directory

// DB Routes
app.use('/api', apiRouter); // endpoints with /api go to db

app.get('/', (req, res) => {
  // serve login path when we hit this endpoint
  // res.set('Content-Type', 'text/html; charset=utf8'); don't need
  res.status(200).sendFile(path.resolve(__dirname, '../views/index.html'));
});

app.post('/signin', authController.verifyUser, (req, res) => {
  res.status(200).redirect('/secret');
});

app.get('/secret', authController.verifySecret);
// start server
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
