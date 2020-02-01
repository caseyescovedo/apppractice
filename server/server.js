const express = require('express');
const path = require('path');
const PORT = 3333;
const app = express();

// takes place of body parser
app.use(express.json());

// serves static files
app.use(express.static('assets'))

// serves up index.html login page
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/index.html'));
})


// catch-all error handler
app.use((req, res) => {
  res.sendStatus(404);
})

// error handler for middleware 
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occured' }
  }
  const errObject = Object.assign(defaultErr, err);
  console.log(errObject);
  res.status(errObject.status).json(errObject.message);
})

app.listen(PORT, function(){
  console.log(`listening on port ${PORT}`);
})