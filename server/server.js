const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const taskRouter = require('./routers/taskRouter');
const authController = require('./controllers/authController');

const app = express();
const PORT = 3333;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('assets'));

app.get('/secret', authController.checkCookie, (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../views/secret.html'));
});

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../views/index.html'));
});

app.post('/signin', authController.validate, (req, res) => {
  return res.sendStatus(200);
});

app.use('/api/secret', taskRouter);

// catch-all for invalid urls
app.use('*', (req, res) => {
  res.sendStatus(404);
});

// globoal error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
