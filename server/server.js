const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const taskRouter = require('./routes/taskRouter');
const authRouter = require('./routes/authRouter');

// Create server
const app = express();
const PORT = 3333;

// ----- PARSING -----
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// ----- STATIC FILES -----
// express sendFile auto-sets Content-Type header based on file extension
app.get('/', (req, res) => res.status(200).sendFile(path.join(__dirname, '../views/index.html')));

app.use('/css', (req, res) =>
  res.status(200).sendFile(path.join(__dirname, '../assets/css/style.css')),
);

app.use('/js', (req, res) =>
  res.status(200).sendFile(path.join(__dirname, '../assets/js/index.js')),
);

app.get('/secret', (req, res) => {
  if (req.cookies && req.cookies.token === 'admin') {
    res.status(200).sendFile(path.join(__dirname, '../views/secret.html'));
  } else {
    res.status(401).json('You must be signed in to view this page');
  }
});

// ----- ROUTES -----
app.use('/tasks', taskRouter);

app.use('/signin', authRouter);

// ----- GLOBAL ERROR HANDLE -----
app.use((err, req, res, next) => {
  const defaultError = {
    log: 'Error handler caught unknown express middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const error = { ...defaultError, ...err };
  console.error(error.log);
  res.status(error.status).json(error.message);
});

// Launch server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
