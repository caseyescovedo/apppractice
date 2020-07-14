const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const tasks = require('./controllers/taskController');
const auth = require('./controllers/authController');

const app = express();
const PORT = 3333;

// body parsers
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// cookie parser
app.use(cookieParser());

// task routes
app.get('/tasks', tasks.getTasks, (req, res) =>
  res.status(200).json(res.locals.tasks)
);

app.post('/tasks', tasks.postTask, (req, res) =>
  res.status(200).json(res.locals.task)
);

app.delete('/tasks', tasks.deleteTask, (req, res) =>
  res.status(200).json(res.locals.task)
);

// auth routes
app.post('/signin', auth.authenticate, auth.setCookie, (req, res) =>
  res.redirect('/secret')
);

// serve index.html on '/' path
app.get('/', (req, res) =>
  res.sendFile(path.resolve(__dirname, '../views/index.html'))
);

// serve secret.html on '/secret' path
app.get('/secret', auth.checkCookie, (req, res) =>
  res.sendFile(path.resolve(__dirname, '../views/secret.html'))
);

// serve static files
app.use(express.static('assets'));

// Error handler
const errorHandler = (err, req, res, next) => {
  // defaultErr object
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(`${errorObj.log}`);
  res.status(errorObj.status).send(JSON.stringify(errorObj.message));
};

app.use(errorHandler);

// start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
