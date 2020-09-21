const express = require('express');
const app = express();
const pool = require('./models/TaskModel');
const path = require('path');
// const router = require('./routers/routers.js');
const PORT = 3333;

// requires all interactions parse json before going to router
app.use(express.json());

// makes sure to handle form data
app.use(express.urlencoded({ extended: true }));

// require routers
const taskRouter = require('./routers/taskRouters.js');
// const authRouter = require('./routers/authRouters.js')

// serves static files in assets to server
app.use(express.static((path.join__dirname, 'assets')));

// server receieves request to '/secret', redirect to taskRouters
app.use('/secret', taskRouter);

//serve index.html AKA login page
app.get('/', (req, res) =>
  res.status(200).sendFile(path.resolve(__dirname, '../views/index.html'))
);

//serve secret.html to /secret AKA to-do app
app.get('/secret', (req, res) =>
  res.status(200).sendFile(path.resolve(__dirname, '../views/secret.html'))
);

//global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown error',
    status: 400,
    message: { err: 'An Error Occurred' },
  };

  const errorObj = Object.assign(defaultErr, err);
  console.log('error', errorObj.log);
  res.status(errorObj.status || 500).send(errorObj.message);
});

// server is listening on port 2222
app.listen(PORT, () => {
  console.log('Listening on PORT 3333');
});

module.exports = app;
