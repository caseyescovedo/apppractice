const path = require('path');
// const bodyParser = require('body-parser');
// const cookieParser = require('cookieParser');
const express = require('express');

const app = express();

const PORT = 3333;

// app.use(bodyParser.json())
// app.use(cookieParser());

app.use('/assets', express.static(path.resolve(__dirname, '../assets')), (req, res) => {
  res.set('Content-Type', 'text/plain');
})

app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../views/index.html'));
});

app.get('/secret', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../views/secret.html'));
});

app.all('*', (req, res) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  }
  const errObj = Object.assign((defaultErr, err));
  console.log(errObj.log);

  res.sendStatus(errObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
