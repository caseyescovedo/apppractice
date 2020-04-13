const path = require('path');
const express = require('express');
const app = express();
const PORT = 3333;
var cookieParser = require('cookie-parser');

const authController = require('./controllers/authController');
const taskController = require('./controllers/taskController');

// to parse req body
app.use(express.json());

app.use(cookieParser());
// serving up my static files

app.use('/assets', express.static(path.resolve(__dirname, '../assets')));

app.get('/signin', (req, res, next) => {
  res.status(200).redirect('/secret');
});

// serving up INDEX.HTML so now it connects
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/index.html'));
});

// serving UP secret log in after they log in correctly

app.get('/secret', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, '../views/secret.html'));
});

// serving UP messages from database
app.get('/tasks', taskController.getItems, (req, res, next) => {
  res.status(200).json(res.locals.tasks);
});

//posting Messages route
app.post(
  '/tasks',
  authController.setCookie,
  taskController.postItem,
  (req, res, next) => {
    console.log('SUCCESSFULLY FINISHED POST ROUTE');
    res.status(200).json(res.locals.responses);
  }
);

// // deleting Messages here

app.delete('/tasks/:id', taskController.deleteItem, (req, res, next) => {
  console.log('SUCCESSFULLY DELETE ROUTE');
  res.sendStatus(200);
});

// sending wrong page error
app.get('/*', (req, res, next) => {
  res.status(404).send('404');
});

// sending global error catcher
app.use((err, req, res, next) => {
  console.log(err);
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    // was 503. changed to 500 to be more appropriate
    status: 500,
    message: { err: 'An error occurred' }
  };
  const errObj = Object.assign(defaultErr, err);
  res.status(errObj.status).json(errObj.message);
});

app.listen(PORT, () => {
  console.log(`The server is listening on PORT: ${PORT}...`);
});
