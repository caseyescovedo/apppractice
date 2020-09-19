const express = require('express');
const app = express();
const path = require('path');
const PORT = 3333;
// const controller = require('../controllers/taskController');

// require all interactions to use/parse JSON
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
const router = require('./routes.js');

app.use('/', express.static(path.resolve(__dirname, '../views')));

app.use('/secret/api', router);

app.use('/secret', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/secret.html'));
});

app.use((req, res) => res.sendStatus(404));

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

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
