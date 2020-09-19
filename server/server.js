const express = require('express');
const app = express();
const path = require('path');
const router = require('./routes');
const cors = require('cors');
const { urlencoded } = require('express');
const PORT = 3333;

// database connection
const connectDB = require('./models/TaskModel.js')
connectDB();

// alleviate cors policy from browser
app.use(cors());

// express.json to parse incoming requests from client
app.use(express.json());
app.use(urlencoded({ extended: true }));

// static file handling
app.use(express.static('assets'));

// respond to main app
app.get('/', (req, res) => {
    return res.sendFile(path.resolve(__dirname, '../views/index.html'))
});//resolve vs join

// response to secret endpoint
app.get('/secret', (req, res) => {
    return res.sendFile(path.resolve(__dirname, '../views/secret.html'))
});

// routes to the routers - Create, Read, Delete will be handled in routes.js
app.use('/api', router);

// catch-all route error handelr
app.use('*', (req, res, next) => {
    res.status(404).send('Sorry can\'t find that??');
})

// global error handler
app.use('/', (err, req, res, next) => {
  const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 400,
      message: {err: 'An error occured??'},
  };
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(400).json(errorObj.message);
});

// connection to server on PORT
app.listen(PORT, () => {
  console.log(`listening  to PORT ${PORT}`);
});

module.exports = app;