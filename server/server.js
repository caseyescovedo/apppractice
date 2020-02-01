const express = require('express');
const PORT = 3333;
const app = express();
const path = require('path');

const controllers = require();

// to parse everything into json; to ensure uniformity
app.use(express.json);

// to serve static files
app.use(express.static('index.js'));

// sets path for the login page
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname), '../views/index.html');
});

// set path for secret page
app.get('/secret', (req, res) => {
  res.sendFile(path.resolve(__dirname), '../views/secret.html');
});

// error handler
app.all('*', (req, res) => {
  return res.sendStatus(404);
});

// global error handler
app.use((err, req, res, next){
  const defaultErr = {
    log: 'Not today, friend. middleware error',
    status: 400,
    message: { err: 'something is not quite right'},    
  },

  const errObject = Object.assign(defaultErr, err);
  res.status(errObject.status).json(errObject.message);
});

app.listen(PORT, () => {
  console.log('Listening on port:', PORT)
});