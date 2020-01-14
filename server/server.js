const express = require('express');
const path = require('path');
const taskController = require("./controllers/taskController");
router = require('./router');

const PORT = 3333;

const app = express();

app.use(express.json());
app.use(express.static('assets'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/../views/index.html'));
});

app.get('/secret', function(req, res) {
  res.sendFile(path.join(__dirname + '/../views/secret.html'));
});

app.post('/signin', function(req, res) {
  res.redirect('/secret');
});

app.use('/api', router)

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


app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))




