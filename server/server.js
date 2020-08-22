const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./routes');
const auth = require('./controllers/authController');

const app = express();
const PORT = 3333;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: 'http://localhost:3333' }));
app.use(cookieParser());

// serve up static assets
app.use('/', express.static(path.join(__dirname, '../assets')));

// serve up html
app.get('/secret', auth.isLoggedIn, (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/secret.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/index.html'));
});

// sign in routing
app.post('/signin', auth.verifyUser, auth.setCookie, (req, res) => {
  res.redirect('/secret');
});

// use routers for task list
app.use('/api', router);

// catch-all route handler
app.use((req, res) => res.sendStatus(404));

// middleware express error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error ocurred' },
  };
  const errObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errObj.status).json(errObj.message);
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
