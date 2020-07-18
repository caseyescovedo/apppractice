const express = require('express');
const router = require('./router/router');
const authRouter = require('./router/authRouter')
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();

const Port = 3333;

// parsing
app.use(express.json());
app.use(cookieParser());

//routes
app.use('/api', router);
app.use('/', authRouter)


// serve index
app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname, '../views/index.html'));
});

//serve  secret
app.get('/secret', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/secret.html'));
});



// serve static
app.use(express.static(path.join(__dirname, '../assets')));

//not found error
app.use('*', (req, res, next) => {
  let error = new Error('Not Found');
  error.statusCode = 404;
  next(error);
});

//glocal error handler
app.use((err, req, res, next) => {
  console.log(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

// listen to port
app.listen(Port, () => console.log(`listening on port ${Port}`));
